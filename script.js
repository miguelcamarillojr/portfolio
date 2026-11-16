(function () {
  "use strict";

  /* ---------- Render projects ---------- */
  var mount = document.getElementById("featured");
  var total = PROJECTS.length;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* The strip is as tall as its tallest frame: l beats m beats s */
  function maxSize(slides) {
    var sizes = slides.map(function (x) { return x.size || "m"; });
    return sizes.indexOf("l") > -1 ? "l" : sizes.indexOf("m") > -1 ? "m" : "s";
  }

  var VIDEO_RE = /\.(mp4|webm|mov|m4v)$/i;

  function slideHTML(s, title, pi, si) {
    var isVideo = s.src && VIDEO_RE.test(s.src);
    var inner = isVideo
      ? '<video src="' + esc(s.src) + '#t=0.001" muted loop playsinline preload="metadata" disablepictureinpicture draggable="false" aria-label="' + esc(title) + '" style="object-position:' + esc(s.pos || "50% 50%") + '"' + (s.poster ? ' poster="' + esc(s.poster) + '"' : "") + "></video>"
      : s.src
      ? '<img src="' + esc(s.src) + '" alt="' + esc(title) + '" loading="lazy" draggable="false" style="object-position:' + esc(s.pos || "50% 50%") + '">'
      : '<div class="ph' + (s.dark ? " dark" : "") + '" style="--tone:' + esc(s.tone || "#efefec") + '">' + esc(s.label || "Image") + "</div>";
    var full = isVideo && s.full;
    return '<div class="slide ' + (s.size || "m") + (full ? " has-full" : "") + '" style="--r:' + (s.ratio || 1) + '"' +
      (s.src ? ' data-p="' + pi + '" data-i="' + si + '"' : "") + ">" + inner +
      (full ? '<span class="watch" aria-hidden="true">Watch full video</span>' : "") + "</div>";
  }

  mount.innerHTML = PROJECTS.map(function (p, i) {
    var slides = p.slides.map(function (s, si) { return slideHTML(s, p.title, i, si); }).join("");
    return (
      '<article class="project">' +
        '<p class="counter">(' + (i + 1) + " / " + total + ")</p>" +
        '<div class="strip max-' + maxSize(p.slides) + '" tabindex="0" aria-label="' + esc(p.title) + ' gallery">' +
          '<div class="track">' +
            slides +
            /* Second copy makes the loop seamless. Hidden from screen readers. */
            '<div class="clones" aria-hidden="true" style="display:contents">' + slides + "</div>" +
          "</div>" +
        "</div>" +
        '<div class="info">' +
          '<div class="head"><p class="title">' + esc(p.title) + '</p><p class="sub">' + esc(p.sub) + "</p></div>" +
          '<div class="meta"><div>Role: ' + esc(p.role) + "</div><div>Year: " + esc(p.year) + "</div><div>Studio: " + esc(p.studio) + "</div></div>" +
          '<div class="tags">' + p.tags.map(function (t) { return "<div>" + esc(t) + "</div>"; }).join("") + "</div>" +
          '<p class="desc">' + esc(p.desc) + "</p>" +
        "</div>" +
      "</article>"
    );
  }).join("");

  /* ---------- Video frames: play only while on screen, never for reduced motion ---------- */
  (function () {
    var vids = [].slice.call(document.querySelectorAll(".slide video"));
    if (!vids.length) return;
    var still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.2 });
    vids.forEach(function (v) { io.observe(v); });
  })();

  /* ---------- Index list (Miscellaneous) + lightbox ---------- */
  var indexList = document.getElementById("indexList");
  if (indexList && typeof INDEX !== "undefined") {
    indexList.innerHTML = INDEX.map(function (r, i) {
      return '<li' + (r.img ? ' data-img="' + esc(r.img) + '"' : "") + ">" +
        '<button type="button" class="ix-row" data-i="' + i + '" aria-label="Open ' + esc(r.name) + '">' +
        '<span class="ix-name">' + esc(r.name) + "</span>" +
        '<span class="ix-cat">' + esc(r.category) + "</span>" +
        '<span class="ix-year">' + esc(r.year) + "</span></button></li>";
    }).join("");

    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML =
      '<div class="lb-bar"><span class="lb-count"></span><button type="button" class="lb-close">Close</button></div>' +
      '<div class="lb-stage"><img alt=""></div>' +
      '<div class="lb-cap"><span class="lb-name"></span><span class="lb-meta mute"></span></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector("img"), lbIdx = 0, lbOpener = null;

    function lbShow(i) {
      lbIdx = (i + INDEX.length) % INDEX.length;
      var r = INDEX[lbIdx];
      lbImg.src = r.img || "";
      lbImg.alt = r.name;
      lb.querySelector(".lb-count").textContent = "(" + (lbIdx + 1) + " / " + INDEX.length + ")";
      lb.querySelector(".lb-name").textContent = r.name;
      lb.querySelector(".lb-meta").textContent = r.category + ", " + r.year;
    }
    function lbOpen(i, opener) {
      lbOpener = opener || null;
      lbShow(i);
      lb.classList.add("on");
      document.documentElement.style.overflow = "hidden";
      lb.querySelector(".lb-close").focus();
    }
    function lbClose() {
      lb.classList.remove("on");
      document.documentElement.style.overflow = "";
      if (lbOpener) lbOpener.focus();
    }

    indexList.addEventListener("click", function (e) {
      var btn = e.target.closest(".ix-row");
      if (btn) lbOpen(parseInt(btn.getAttribute("data-i"), 10), btn);
    });
    lb.querySelector(".lb-close").addEventListener("click", lbClose);
    lb.querySelector(".lb-stage").addEventListener("click", function (e) {
      /* click the image for next, empty space to close */
      if (e.target === lbImg) lbShow(lbIdx + 1); else lbClose();
    });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") lbClose();
      else if (e.key === "ArrowRight") lbShow(lbIdx + 1);
      else if (e.key === "ArrowLeft") lbShow(lbIdx - 1);
    });
  }

  /* ---------- Viewer: click any frame to open it. Images and videos, arrows or keys to move. ---------- */
  var vw = document.createElement("div");
  vw.className = "vlb";
  vw.setAttribute("role", "dialog");
  vw.setAttribute("aria-modal", "true");
  vw.setAttribute("aria-label", "Project viewer");
  vw.innerHTML =
    '<div class="vlb-bar"><span class="vlb-title"></span><span class="vlb-nav">' +
    '<button type="button" class="vlb-prev">Prev</button><button type="button" class="vlb-next">Next</button><button type="button" class="vlb-close">Close</button></span></div>' +
    '<div class="vlb-stage"></div>';
  document.body.appendChild(vw);
  var vStage = vw.querySelector(".vlb-stage"), vTitle = vw.querySelector(".vlb-title");
  var vItems = [], vIdx = 0, vName = "", vOpener = null;

  function vShow(i) {
    var n = vItems.length;
    for (var tries = 0; tries < n; tries++) {
      vIdx = ((i % n) + n) % n;
      if (vItems[vIdx].src) break;
      i += 1;
    }
    var it = vItems[vIdx], src = it.full || it.src;
    var old = vStage.querySelector("video");
    if (old) { old.pause(); old.removeAttribute("src"); old.load(); }
    vStage.innerHTML = VIDEO_RE.test(src)
      ? '<video controls autoplay playsinline preload="auto" src="' + esc(src) + '"></video>'
      : '<img src="' + esc(src) + '" alt="' + esc(vName) + '" draggable="false">';
    vTitle.textContent = vName + "  (" + (vIdx + 1) + " / " + n + ")";
  }
  function vOpen(pi, si, opener) {
    vItems = PROJECTS[pi].slides; vName = PROJECTS[pi].title; vOpener = opener || null;
    vShow(si);
    vw.classList.add("on");
    document.documentElement.style.overflow = "hidden";
    vw.querySelector(".vlb-close").focus();
  }
  function vClose() {
    var v = vStage.querySelector("video");
    if (v) { v.pause(); v.removeAttribute("src"); v.load(); }
    vStage.innerHTML = "";
    vw.classList.remove("on");
    document.documentElement.style.overflow = "";
    if (vOpener) vOpener.focus();
  }
  vw.querySelector(".vlb-close").addEventListener("click", vClose);
  vw.querySelector(".vlb-prev").addEventListener("click", function () { vShow(vIdx - 1); });
  vw.querySelector(".vlb-next").addEventListener("click", function () { vShow(vIdx + 1); });
  vStage.addEventListener("click", function (e) {
    /* click the image for next, empty space to close, video controls do their own thing */
    if (e.target.tagName === "IMG") vShow(vIdx + 1);
    else if (e.target === vStage) vClose();
  });
  document.addEventListener("keydown", function (e) {
    if (!vw.classList.contains("on")) return;
    if (e.key === "Escape") vClose();
    else if (e.target.tagName === "VIDEO") return;     /* leave arrows to the video's own seek */
    else if (e.key === "ArrowRight") vShow(vIdx + 1);
    else if (e.key === "ArrowLeft") vShow(vIdx - 1);
  });

  /* ---------- Auto-scrolling strips ----------
     The strip moves with a CSS transform, not native scrolling, so motion stays smooth.
     A light touch or a vertical swipe never interrupts it. Only a deliberate horizontal
     drag takes over. On release it stops following your finger and carries on at the
     auto speed, with no momentum (same as the Framer site). */
  var SPEED = 60;        // pixels per second (measured from the Framer site)
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tabletUp = window.matchMedia("(min-width: 810px)");   // drag shrink effect is for tablet and desktop only

  document.querySelectorAll(".strip").forEach(function (strip) {
    var track = strip.querySelector(".track");
    var pos = 0;            // current offset in pixels
    var loopW = 0;          // width of one full set of slides
    var visible = true;
    var down = false, dragging = false, pid = null;
    var squeeze = 1, vel = 0, lastMoveX = 0, lastMoveT = 0;   // frame scale while dragging
    var coast = 0;          // extra speed (px/s) carried after a drag, fades out on its own
    var startX = 0, startY = 0, startPos = 0;
    var last = performance.now();

    function measure() {
      var first = track.querySelector(".slide");
      var clone = track.querySelector(".clones .slide");
      if (first && clone) loopW = clone.offsetLeft - first.offsetLeft;
    }
    function wrap() {
      if (loopW > 0) pos = ((pos % loopW) + loopW) % loopW;
    }
    function render() {
      track.style.transform = "translate3d(" + (-pos) + "px,0,0)";
    }

    strip.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true; dragging = false; pid = e.pointerId;
      startX = e.clientX; startY = e.clientY; startPos = pos;
    });

    strip.addEventListener("pointermove", function (e) {
      if (!down || e.pointerId !== pid) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;

      if (!dragging) {
        if (e.pointerType === "mouse") {
          if (Math.abs(dx) > 3) dragging = true;
        } else if (Math.abs(dx) + Math.abs(dy) > 8) {
          if (Math.abs(dx) >= Math.abs(dy)) {
            dragging = true;                  // mostly horizontal: take over
          } else {
            down = false;                     // mostly vertical: the page is scrolling, leave it alone
            return;
          }
        }
        if (dragging) {
          strip.classList.add("dragging");
          try { strip.setPointerCapture(pid); } catch (err) {}
          startX = e.clientX; startPos = pos;
          lastMoveX = e.clientX; lastMoveT = 0; vel = 0;
        }
        return;
      }

      var nowT = performance.now();
      if (lastMoveT) {
        var inst = (e.clientX - lastMoveX) / Math.max(nowT - lastMoveT, 1) * 1000;
        vel += (inst - vel) * 0.25;               // smoothed pointer speed in px/s
      }
      lastMoveX = e.clientX; lastMoveT = nowT;
      pos = startPos - (e.clientX - startX);
      wrap(); render();
    });

    function release(e) {
      if (e.pointerId !== pid) return;
      if (dragging) {
        strip.classList.remove("dragging");
        /* A light flick carries on for a moment: 80% of the release speed, fading out fast */
        var idle = performance.now() - lastMoveT;
        coast = (reduceMotion || idle > 90) ? 0 : Math.max(-2200, Math.min(2200, -vel * 0.8));
      }
      down = false; dragging = false; pid = null;
    }
    strip.addEventListener("pointerup", release);
    strip.addEventListener("pointercancel", release);

    /* A plain click opens the viewer. A click that ends a drag does not. */
    var wasDrag = false;
    strip.addEventListener("pointerdown", function () { wasDrag = false; }, true);
    strip.addEventListener("pointerup", function () { wasDrag = dragging; }, true);
    strip.addEventListener("click", function (e) {
      if (wasDrag) { wasDrag = false; return; }
      var slide = e.target.closest && e.target.closest(".slide[data-p]");
      if (slide) vOpen(parseInt(slide.getAttribute("data-p"), 10), parseInt(slide.getAttribute("data-i"), 10), strip);
    });

    /* Keyboard */
    strip.addEventListener("keydown", function (e) {
      var step = strip.clientWidth * 0.5;
      if (e.key === "ArrowRight") pos += step;
      else if (e.key === "ArrowLeft") pos -= step;
      else return;
      e.preventDefault();
      wrap(); render();
    });

    /* Only animate strips that are on screen */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        last = performance.now();
      }).observe(strip);
    }

    function frame(now) {
      var dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (visible && !dragging && loopW > 0) {
        pos += ((reduceMotion ? 0 : SPEED) + coast) * dt;
        coast *= Math.exp(-dt * 4);
        if (Math.abs(coast) < 1) coast = 0;
        wrap(); render();
      }
      /* Frames shrink a touch while you drag (a bit more when you drag fast) and ease back on release */
      if (visible && !reduceMotion) {
        if (!dragging) vel *= Math.max(0, 1 - dt * 8);
        var target = dragging && tabletUp.matches ? 0.95 - Math.min(Math.abs(vel) / 5000, 0.035) : 1;
        var prev = squeeze;
        squeeze += (target - squeeze) * Math.min(1, dt * (dragging ? 7 : 5));
        if (Math.abs(squeeze - 1) < 0.0003) squeeze = 1;
        if (squeeze !== prev) track.style.setProperty("--sq", squeeze.toFixed(4));
      }
      requestAnimationFrame(frame);
    }

    window.addEventListener("load", function () { measure(); wrap(); render(); });
    window.addEventListener("resize", function () { measure(); wrap(); render(); });
    measure();
    requestAnimationFrame(frame);
  });

  /* ---------- "Drag" cursor over the strips (desktop with a mouse only) ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var dc = document.createElement("div");
    dc.className = "drag-cursor";
    dc.setAttribute("aria-hidden", "true");
    dc.innerHTML = "<span>Drag</span>";
    document.body.appendChild(dc);
    document.documentElement.classList.add("has-drag-cursor");

    var dcText = dc.firstChild, playLabel = false;
    var cx = 0, cy = 0, tx = 0, ty = 0, showing = false, ticking = false;

    function place() {
      dc.style.transform = "translate3d(" + (cx - 36) + "px," + (cy - 36) + "px,0)";
    }
    function follow() {
      cx += (tx - cx) * 0.25;
      cy += (ty - cy) * 0.25;
      place();
      if (showing) requestAnimationFrame(follow); else ticking = false;
    }
    function show(e) {
      tx = e.clientX; ty = e.clientY;
      if (showing) return;
      cx = tx; cy = ty; place();
      showing = true;
      dc.classList.add("on");
      if (!ticking) { ticking = true; requestAnimationFrame(follow); }
    }

    document.querySelectorAll(".strip").forEach(function (strip) {
      strip.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") show(e); });
      strip.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return;
        var onVideo = !!(e.target.closest && e.target.closest(".slide.has-full"));
        if (onVideo !== playLabel) { playLabel = onVideo; dcText.textContent = onVideo ? "Play" : "Drag"; }
        if (!showing) show(e); else { tx = e.clientX; ty = e.clientY; }
      });
      strip.addEventListener("pointerleave", function (e) {
        if (e.pointerType !== "mouse") return;
        showing = false;
        dc.classList.remove("on", "down");
      });
      strip.addEventListener("pointerdown", function (e) { if (e.pointerType === "mouse") dc.classList.add("down"); });
      strip.addEventListener("pointerup", function () { dc.classList.remove("down"); });
      strip.addEventListener("pointercancel", function () { dc.classList.remove("down"); });
    });
  }

  /* ---------- Image peek over the capabilities list (desktop with a mouse only) ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var peek = document.createElement("div");
    peek.className = "peek";
    peek.setAttribute("aria-hidden", "true");
    peek.innerHTML = '<img alt="" draggable="false">';
    document.body.appendChild(peek);
    var peekImg = peek.querySelector("img");
    var px = 0, py = 0, qx = 0, qy = 0, peeking = false, pTicking = false;

    function peekPlace() {
      var x = px + 24, y = py + 20;
      if (x + 240 > window.innerWidth - 8) x = px - 240 - 24;
      if (y + 160 > window.innerHeight - 8) y = py - 160 - 20;
      peek.style.transform = "translate3d(" + x + "px," + y + "px,0)";
    }
    function peekFollow() {
      px += (qx - px) * 0.22;
      py += (qy - py) * 0.22;
      peekPlace();
      if (peeking) requestAnimationFrame(peekFollow); else pTicking = false;
    }

    document.querySelectorAll(".index-list li[data-img]").forEach(function (li) {
      var pre = new Image();
      pre.src = li.getAttribute("data-img");
      li.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "mouse") return;
        peekImg.src = li.getAttribute("data-img");
        qx = e.clientX; qy = e.clientY;
        if (!peeking) { px = qx; py = qy; peekPlace(); }
        peeking = true;
        peek.classList.add("on");
        if (!pTicking) { pTicking = true; requestAnimationFrame(peekFollow); }
      });
      li.addEventListener("pointermove", function (e) {
        if (e.pointerType === "mouse") { qx = e.clientX; qy = e.clientY; }
      });
      li.addEventListener("pointerleave", function () {
        peeking = false;
        peek.classList.remove("on");
      });
    });
  }

  /* ---------- Live Central Time clock (24 hour) ---------- */
  var clock = document.getElementById("clock");
  var fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
  });
  function tick() {
    clock.textContent = fmt.format(new Date());
  }
  tick();
  setInterval(tick, 1000);
})();
