import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

export default class InfiniteGrid {
  constructor({ el, sources, data, originalSize }) {
    this.$container   = el;
    this.sources      = sources;
    this.data         = data;
    this.originalSize = originalSize;

    // Check if device is mobile
    this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    this.scroll = {
      ease:   0.06,
      current:{ x: 0, y: 0 },
      target: { x: 0, y: 0 },
      last:   { x: 0, y: 0 },
      delta: { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } }
    };

    this.isDragging = false;
    this.drag = { startX: 0, startY: 0, scrollX: 0, scrollY: 0 };

    this.mouse = {
      x: { t: 0.5, c: 0.5 },
      y: { t: 0.5, c: 0.5 },
      press: { t: 0, c: 0 },
    };

    this.items = [];

    this.onResize     = this.onResize.bind(this);
    this.onWheel      = this.onWheel.bind(this);
    this.onMouseMove  = this.onMouseMove.bind(this);
    this.onMouseDown  = this.onMouseDown.bind(this);
    this.onMouseUp    = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove  = this.onTouchMove.bind(this);
    this.onTouchEnd   = this.onTouchEnd.bind(this);
    this.render       = this.render.bind(this);

    window.addEventListener('resize', this.onResize);
    
    // Enable both desktop and mobile interactions
    window.addEventListener('wheel', this.onWheel, { passive: false });
    window.addEventListener('mousemove', this.onMouseMove);
    this.$container.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    
    // Add touch event listeners for mobile
    this.$container.addEventListener('touchstart', this.onTouchStart, { passive: false });
    this.$container.addEventListener('touchmove', this.onTouchMove, { passive: false });
    this.$container.addEventListener('touchend', this.onTouchEnd, { passive: true });

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    });

    this.onResize();
    this.render();
    this.initIntro();
    this.intro();
  }

  initIntro() {
    this.introItems = [...this.$container.querySelectorAll('.item-wrapper')].filter((item) => {
      const rect = item.getBoundingClientRect();
      return (
        rect.x > -rect.width &&
        rect.x < window.innerWidth + rect.width &&
        rect.y > -rect.height &&
        rect.y < window.innerHeight + rect.height
      );
    });
    this.introItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const x = -rect.x + window.innerWidth * 0.5 - rect.width * 0.5;
      const y = -rect.y + window.innerHeight * 0.5 - rect.height * 0.5;
      gsap.set(item, { x, y });
    });
  }

  intro() {
    gsap.to(this.introItems.reverse(), {
      duration: 2,
      ease: 'expo.inOut',
      x: 0,
      y: 0,
      stagger: 0.05,
    });
  }

  onResize() {
    this.winW = window.innerWidth;
    this.winH = window.innerHeight;

    // Adjust tile size for mobile to show bigger, fewer images
    if (this.isMobile) {
      // Make tiles larger on mobile for bigger images and more space
      this.tileSize = {
        w: this.winW * 2.0, // 100% larger than screen width for more spacing
        h: (this.winW * 2.0) * (this.originalSize.h / this.originalSize.w),
      };
    } else {
      this.tileSize = {
        w: this.winW,
        h: (this.winW) * (this.originalSize.h / this.originalSize.w),
      };
    }

    this.scroll.current = { x: 0, y: 0 };
    this.scroll.target  = { x: 0, y: 0 };
    this.scroll.last    = { x: 0, y: 0 };

    this.$container.innerHTML = '';

    // Create all items first
    const baseItems = this.data.map((d, i) => {
      const scaleX = this.tileSize.w / this.originalSize.w;
      const scaleY = this.tileSize.h / this.originalSize.h;
      const source = this.sources[i % this.sources.length];

      // Extra spacing on mobile to reduce density
      const spacingMultiplier = this.isMobile ? 2.2 : 1;

      return {
        src: source.src,
        caption: source.caption,
        x: d.x * scaleX * spacingMultiplier,
        y: d.y * scaleY * spacingMultiplier,
        w: d.w * scaleX,
        h: d.h * scaleY
      };
    });

    // --- NEW: robust, periodic no-overlap layout computed ONLY on the base tile ---
    if (this.isMobile) {
      // pixels; feel free to tweak
      const baseSpacing = 80;
      const cellSize = Math.max(96, Math.min(this.tileSize.w, this.tileSize.h) * 0.12);
      this.relaxNoOverlapPeriodic(baseItems, this.tileSize.w, this.tileSize.h, {
        iterations: 18,
        cellSize,
        spacing: baseSpacing,
        sizeAware: true
      });
    }

    this.items = [];

    // IMPORTANT: reps are aligned to the base tile size (periodic tiling)
    const repsX = [0, this.tileSize.w];
    const repsY = [0, this.tileSize.h];

    // Create DOM for items (2x2 tiling)
    baseItems.forEach(base => {
      repsX.forEach(offsetX => {
        repsY.forEach(offsetY => {
          const el = document.createElement('div');
          el.classList.add('item');
          el.style.width = `${base.w}px`;

          const wrapper = document.createElement('div');
          wrapper.classList.add('item-wrapper');
          el.appendChild(wrapper);

          const itemImage = document.createElement('div');
          itemImage.classList.add('item-image');
          itemImage.style.width = `${base.w}px`;
          itemImage.style.height = `${base.h}px`;
          wrapper.appendChild(itemImage);

          const img = new Image();
          img.src = `./img/${base.src}`;
          itemImage.appendChild(img);

          const caption = document.createElement('small');
          caption.innerHTML = base.caption;
          const split = new SplitText(caption, { type: 'lines', mask: 'lines', linesClass: 'line' });
          split.lines.forEach((line, i) => {
            line.style.transitionDelay = `${i * 0.15}s`;
            line.parentElement.style.transitionDelay = `${i * 0.15}s`;
          });
          wrapper.appendChild(caption);
          this.$container.appendChild(el);
          this.observer.observe(caption);

          this.items.push({
            el,
            container: itemImage,
            wrapper,
            img,
            x: base.x + offsetX,
            y: base.y + offsetY,
            w: base.w,
            h: base.h,
            extraX: 0,
            extraY: 0,
            rect: el.getBoundingClientRect(),
            ease: Math.random() * 0.5 + 0.5,
          });
        });
      });
    });

    // Double the tile after replicating to 2x2 (keep your original wrap logic)
    this.tileSize.w *= 2;
    this.tileSize.h *= 2;

    this.scroll.current.x = this.scroll.target.x = this.scroll.last.x = -this.winW * 0.1;
    this.scroll.current.y = this.scroll.target.y = this.scroll.last.y = -this.winH * 0.1;
  }

  // Periodic, size-aware relaxation with spatial hashing (no-overlap for mobile)
  relaxNoOverlapPeriodic(items, tileW, tileH, {
    iterations = 16,
    cellSize = 120,
    spacing = 80,
    sizeAware = true
  } = {}) {
    // Normalize to [0, L) with wrap-around
    const mod = (v, L) => ((v % L) + L) % L;

    // Build a spatial hash each iteration
    const buildHash = () => {
      const cols = Math.max(1, Math.ceil(tileW / cellSize));
      const rows = Math.max(1, Math.ceil(tileH / cellSize));
      const hash = new Map();

      const pushToCell = (gx, gy, it) => {
        const key = `${(gx + cols) % cols}|${(gy + rows) % rows}`;
        if (!hash.has(key)) hash.set(key, []);
        hash.get(key).push(it);
      };

      items.forEach(it => {
        // normalized coords inside base tile
        it._nx = mod(it.x, tileW);
        it._ny = mod(it.y, tileH);
        const gx = Math.floor(it._nx / cellSize);
        const gy = Math.floor(it._ny / cellSize);
        pushToCell(gx, gy, it);
      });

      return { hash, cols, rows };
    };

    for (let iter = 0; iter < iterations; iter++) {
      const { hash, cols, rows } = buildHash();
      let movedPairs = 0;

      // Relax by visiting each item and its neighboring cells
      items.forEach(a => {
        const gx = Math.floor(a._nx / cellSize);
        const gy = Math.floor(a._ny / cellSize);

        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const key = `${(gx + ox + cols) % cols}|${(gy + oy + rows) % rows}`;
            const bucket = hash.get(key);
            if (!bucket) continue;

            for (const b of bucket) {
              if (a === b) continue;

              // Shortest vector between a and b under periodic boundary
              let dx = a._nx - b._nx;
              let dy = a._ny - b._ny;
              dx -= Math.round(dx / tileW) * tileW;
              dy -= Math.round(dy / tileH) * tileH;

              const dist = Math.hypot(dx, dy) || 1e-6;

              // Size-aware "radius" (use min side to be conservative)
              const ra = sizeAware ? Math.min(a.w, a.h) * 0.5 : 0;
              const rb = sizeAware ? Math.min(b.w, b.h) * 0.5 : 0;
              const required = ra + rb + spacing;

              if (dist < required) {
                // Push away along the connecting line (split displacement)
                const push = (required - dist) * 0.5;
                const ux = dx / dist;
                const uy = dy / dist;

                a.x += ux * push;
                a.y += uy * push;
                b.x -= ux * push;
                b.y -= uy * push;

                movedPairs++;
              }
            }
          }
        }
      });

      // Wrap back into [0, tile] to keep periodicity; add tiny jitter to avoid lock
      const jitter = 0.01;
      items.forEach(it => {
        it.x = mod(it.x, tileW) + (Math.random() - 0.5) * jitter;
        it.y = mod(it.y, tileH) + (Math.random() - 0.5) * jitter;
      });

      // Early-out if stable
      if (movedPairs === 0) break;
    }
  }

  onWheel(e) {
    e.preventDefault();
    const factor = 0.4;
    this.scroll.target.x -= e.deltaX * factor;
    this.scroll.target.y -= e.deltaY * factor;
  }

  onMouseDown(e) {
    e.preventDefault();
    this.isDragging = true;
    document.documentElement.classList.add('dragging');
    this.mouse.press.t = 1;
    this.drag.startX = e.clientX;
    this.drag.startY = e.clientY;
    this.drag.scrollX = this.scroll.target.x;
    this.drag.scrollY = this.scroll.target.y;
  }

  onMouseUp() {
    this.isDragging = false;
    document.documentElement.classList.remove('dragging');
    this.mouse.press.t = 0;
  }

  onMouseMove(e) {
    this.mouse.x.t = e.clientX / this.winW;
    this.mouse.y.t = e.clientY / this.winH;

    if (this.isDragging) {
      const dx = e.clientX - this.drag.startX;
      const dy = e.clientY - this.drag.startY;
      this.scroll.target.x = this.drag.scrollX + dx;
      this.scroll.target.y = this.drag.scrollY + dy;
    }
  }

  onTouchStart(e) {
    e.preventDefault();
    this.isDragging = true;
    document.documentElement.classList.add('dragging');
    this.mouse.press.t = 1;
    this.drag.startX = e.touches[0].clientX;
    this.drag.startY = e.touches[0].clientY;
    this.drag.scrollX = this.scroll.target.x;
    this.drag.scrollY = this.scroll.target.y;
  }

  onTouchMove(e) {
    e.preventDefault();
    this.mouse.x.t = e.touches[0].clientX / this.winW;
    this.mouse.y.t = e.touches[0].clientY / this.winH;

    if (this.isDragging) {
      const dx = e.touches[0].clientX - this.drag.startX;
      const dy = e.touches[0].clientY - this.drag.startY;
      this.scroll.target.x = this.drag.scrollX + dx;
      this.scroll.target.y = this.drag.scrollY + dy;
    }
  }

  onTouchEnd() {
    this.isDragging = false;
    document.documentElement.classList.remove('dragging');
    this.mouse.press.t = 0;
  }

  render() {
    // Keep the infinite grid layout on mobile, just enable touch scrolling
    this.scroll.current.x += (this.scroll.target.x - this.scroll.current.x) * this.scroll.ease;
    this.scroll.current.y += (this.scroll.target.y - this.scroll.current.y) * this.scroll.ease;

    this.scroll.delta.x.t = this.scroll.current.x - this.scroll.last.x;
    this.scroll.delta.y.t = this.scroll.current.y - this.scroll.last.y;
    this.scroll.delta.x.c += (this.scroll.delta.x.t - this.scroll.delta.x.c) * 0.04;
    this.scroll.delta.y.c += (this.scroll.delta.y.t - this.scroll.delta.y.c) * 0.04;
    this.mouse.x.c += (this.mouse.x.t - this.mouse.x.c) * 0.04;
    this.mouse.y.c += (this.mouse.y.t - this.mouse.y.c) * 0.04;
    this.mouse.press.c += (this.mouse.press.t - this.mouse.press.c) * 0.04;

    const dirX = this.scroll.current.x > this.scroll.last.x ? 'right' : 'left';
    const dirY = this.scroll.current.y > this.scroll.last.y ? 'down'  : 'up';

    this.items.forEach(item => {
      // 1) 先算「格點」位置（不含視差），用來決定 wrap 與外層容器 transform
      const baseX = item.x + this.scroll.current.x + item.extraX;
      const baseY = item.y + this.scroll.current.y + item.extraY;

      // 2) 視差只施加在內層 .item-image（item.container），不動外層 .item
      //    並在手機上限制最大振幅，避免內層位移過大造成視覺重疊
      const parallaxMax = this.isMobile
        ? Math.min(24, 0.18 * Math.min(item.w, item.h))   // 手機：最多 ~24px 或影像短邊的 18%
        : Math.min(60, 0.25 * Math.min(item.w, item.h));  // 桌機：放寬一些

      let pX = (this.mouse.x.c - 0.5) * 2 * parallaxMax + 2.5 * this.scroll.delta.x.c * item.ease;
      let pY = (this.mouse.y.c - 0.5) * 2 * parallaxMax + 2.5 * this.scroll.delta.y.c * item.ease;

      // clamp
      pX = Math.max(-parallaxMax, Math.min(parallaxMax, pX));
      pY = Math.max(-parallaxMax, Math.min(parallaxMax, pY));

      // 3) wrap 判斷只用 baseX/baseY（外層格點不受視差影響）
      const posX = baseX;
      const posY = baseY;

      const beforeX = posX > this.winW;
      const afterX  = posX + item.rect.width < 0;
      if (dirX === 'right' && beforeX) item.extraX -= this.tileSize.w;
      if (dirX === 'left'  && afterX)  item.extraX += this.tileSize.w;

      const beforeY = posY > this.winH;
      const afterY  = posY + item.rect.height < 0;
      if (dirY === 'down' && beforeY) item.extraY -= this.tileSize.h;
      if (dirY === 'up'   && afterY)  item.extraY += this.tileSize.h;

      // 4) 外層 .item 只負責格點定位；內層 .item-image 做視差
      item.el.style.transform        = `translate(${baseX}px, ${baseY}px)`;
      item.container.style.transform = `translate(${pX}px, ${pY}px)`;

      // 5) 你原本的 img 視覺效果可保留（縮放＋微移），其位移是相對於 item.container 的，不會造成格點互撞
      item.img.style.transform = `scale(${1.2 + 0.2 * this.mouse.press.c * item.ease}) translate(${-this.mouse.x.c * item.ease * 10}%, ${-this.mouse.y.c * item.ease * 10}%)`;
    });

    this.scroll.last.x = this.scroll.current.x;
    this.scroll.last.y = this.scroll.current.y;

    requestAnimationFrame(this.render);
  }

  destroy() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('wheel', this.onWheel);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.$container.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.observer.disconnect();
  }
}
