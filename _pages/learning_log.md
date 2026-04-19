---
layout: page
title: learning log
permalink: /learning/
description: Things I've been reading and watching — papers, blog posts, books, and videos that connect to my work in ML and AI Safety. A way to document the learning process over time.
nav: true
nav_order: 2
---

<div class="learning-log">
{% comment %}
{% for week in site.data.learning_log %}
  <div class="week">
    <div class="week-label">{{ week.week }}</div>
    {% for entry in week.entries %}
    <div class="entry">
      <div class="entry-top">
        <span class="type-tag {{ entry.type }}">{{ entry.type }}</span>
        <a class="entry-title" href="{{ entry.url }}" target="_blank" rel="noopener noreferrer">{{ entry.title }}</a>
        <span class="entry-author">— {{ entry.author }}</span>
      </div>
      {% if entry.note %}
      <div class="entry-note">{{ entry.note }}</div>
      {% endif %}
    </div>
    {% endfor %}
  </div>
{% endfor %}
{% endcomment %}
</div>
