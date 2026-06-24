---
layout: post
date: 2026-05-10
title: I completed 6-hour archery course!🏹
inline: false
related_posts: false
_styles: |
  .paris-triptych {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
    margin: 20px 0;
  }

  .paris-triptych img,
  .paris-gallery img,
  .paris-story img {
    width: 100%;
    display: block;
    border-radius: 10px;
  }

  .paris-triptych img {
    height: 100%;
    object-fit: cover;
  }

  .paris-triptych > *:first-child img {
    object-position: center 35%;
  }

  .paris-gallery {
    max-width: 900px;
    margin: 0 auto 20px auto;
  }

  .paris-gallery-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 15px;
    align-items: stretch;
  }

  .paris-gallery-stack {
    display: grid;
    gap: 20px;
  }

  .paris-story {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 20px;
    align-items: center;
    margin: 20px 0;
  }

  .paris-story p {
    margin: 0;
  }

  .paris-story.reverse .paris-story-copy {
    order: -1;
  }

  @media (max-width: 767.98px) {
    .paris-triptych,
    .paris-gallery-grid,
    .paris-story {
      grid-template-columns: 1fr;
    }

    .paris-gallery-stack {
      gap: 15px;
    }

    .paris-story,
    .paris-triptych,
    .paris-gallery {
      margin: 16px 0;
    }

    .paris-triptych img {
      height: auto;
    }

    .paris-story.reverse .paris-story-copy {
      order: 0;
    }
  }
---
The dream came true...

<!-- <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
  <img src="/assets/img/news/archery.jpeg" alt="Archery" style="width: 100%; height: 100%; object-fit: cover;">
  <img src="/assets/img/news/archery2.jpeg" alt="Archery" style="width: 100%; height: 100%; object-fit: cover;">
</div> -->
<div class="paris-triptych">
  <img src="/assets/img/news/archery.jpeg" alt="Archery" />
  <img src="/assets/img/news/archery2.jpeg" alt="Archery" />
  <img src="/assets/img/news/archery3.jpeg" alt="Archery" />
</div>


