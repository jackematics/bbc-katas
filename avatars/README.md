Avatar / logo generator
Auto-generate avatar / logo images.

Background
Lots of services (e.g. GitHub / NPM) allow you to upload an image as an avatar. If you choose not to upload an image, they will auto-generate one for you, often based on blocks. Here are some examples from GitHub:

The goal of this kata is to create an application that can generate random avatars.

Some ideas for variations:

The avatars above have a single colour each. You could vary the colour and the opacity within an avatar.
The avatars above use a grid of squares — consider using a different grid size / layout / shape.
The avatars above use a single line of mirror symmetry — think about other ways to make the avatars interesting.
Possible extensions
Generate an image for a given string — the same string input should generate the same image
Create a browser app that shows off your image generator (you might want to use image data URLs to display the generated images)
Make your logos look pretty!
Potentially useful information
You are free to generate images however you please, but an SVG might be an easy option. Here is an SVG for a block-style avatar like those above:

<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="0 0 5 5" width="5" height="5" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="5" height="5" fill="white" />
  <rect x="0" y="0" width="1" height="1" style="fill: hotpink" />
  <rect x="1" y="0" width="1" height="1" style="fill: hotpink" />
  <rect x="3" y="0" width="1" height="1" style="fill: hotpink" />
  <rect x="4" y="0" width="1" height="1" style="fill: hotpink" />
  <rect x="1" y="1" width="1" height="1" style="fill: hotpink" />
  <rect x="3" y="1" width="1" height="1" style="fill: hotpink" />
  <rect x="2" y="2" width="1" height="1" style="fill: hotpink" />
  <rect x="0" y="3" width="1" height="1" style="fill: hotpink" />
  <rect x="2" y="3" width="1" height="1" style="fill: hotpink" />
  <rect x="4" y="3" width="1" height="1" style="fill: hotpink" />
  <rect x="1" y="4" width="1" height="1" style="fill: hotpink" />
  <rect x="2" y="4" width="1" height="1" style="fill: hotpink" />
  <rect x="3" y="4" width="1" height="1" style="fill: hotpink" />
</svg>
The polygon tag may also be useful. This draws an enclosed shape with straight lines with vertices at the given co-ordinates. For example, this draws a triangle with corners at (0,0), (0,1) and (1,1).

<polygon points="0,0 0,1 1,1" />
You could also try playing around with style (css styling) and transform (which lets you rotate / translate content).

Various colour representations are available, but hexadecimal might be the most useful:

RBG hex, e.g. #010203
RBG hex with opacity, e.g. #01020304 (the last pair of hex digits are the opacity)
