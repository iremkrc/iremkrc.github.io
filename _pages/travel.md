---
layout: page
title: travel
permalink: /travel/
description: A collection of my travel adventures and experiences around the world.
nav: true
nav_order: 3
display_categories: [europe, asia, north_america]
horizontal: false
---

<!-- pages/travel.md -->
<div class="travel">
{% assign paris_travel = site.travel | where: "title", "Paris, France" %}
{% assign sorted_travel = paris_travel | sort: "importance" %}

  <!-- Generate cards for each travel destination -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for travel in sorted_travel %}
      {% include travel_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for travel in sorted_travel %}
      {% include travel.liquid %}
    {% endfor %}
  </div>
  {% endif %}
</div>
