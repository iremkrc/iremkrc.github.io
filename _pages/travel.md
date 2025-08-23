---
layout: page
title: travel
permalink: /travel/
description: A collection of my travel adventures and experiences around the world.
nav: true
nav_order: 1
display_categories: [europe, asia, north_america]
horizontal: false
---

<!-- pages/travel.md -->
<div class="travel">
{% if site.enable_travel_categories and page.display_categories %}
  <!-- Display categorized travel destinations -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category | replace: "_", " " | capitalize }}</h2>
  </a>
  {% assign categorized_travel = site.travel | where: "category", category %}
  {% assign sorted_travel = categorized_travel | sort: "importance" %}
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
  {% endfor %}

{% else %}

<!-- Display travel destinations without categories -->

{% assign sorted_travel = site.travel | sort: "importance" %}

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
{% endif %}
</div>