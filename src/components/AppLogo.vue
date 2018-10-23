<template>
  <!-- eslint-disable max-len -->
  <svg width="172" height="173" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <path id="a" d="M.05.26h137.636v171.588H.05z"/>
      <path id="c" d="M0 .205h35.972v28.672H0z"/>
      <path id="e" d="M.12.191h35.553v28.7H.12z"/>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(16)">
        <mask id="b" fill="#fff">
          <use xlink:href="#a"/>
        </mask>
        <path d="M137.686 86.054c0 47.384-30.81 85.794-68.818 85.794C30.86 171.848.05 133.438.05 86.054.05 38.671 30.86.26 68.868.26c38.007 0 68.818 38.411 68.818 85.794" fill="#FFF" mask="url(#b)"/>
      </g>
      <path d="M136.946 91.905L119.81 78l-17.14 13.905L85.53 78H154.086 16.95h68.557l-17.14 13.905L51.229 78 34.09 91.905 16.951 78 0 91.752C4.258 136.8 40.91 172 85.499 172c44.599 0 81.256-35.215 85.501-80.277L154.086 78l-17.14 13.905z" fill="#4F009E"/>
      <path fill="#D60266" d="M104 51L86.5 65 69 51z"/>
      <path d="M51.09 161.45c18.676 15.4 49.07 15.4 67.873 0 18.673-15.298 18.673-39.985.257-55.387L84.96 78l-34.9 28.591c-17.773 15.506-17.386 39.771 1.03 54.858" fill="#6100C2"/>
      <path d="M61.275 164.49c13.616 11.347 35.778 11.347 49.49 0 13.615-11.272 13.615-29.463.187-40.812L85.972 103l-25.448 21.067c-12.96 11.425-12.678 29.305.751 40.422" fill="#6B00D6"/>
      <g transform="translate(0 37)">
        <mask id="d" fill="#fff">
          <use xlink:href="#c"/>
        </mask>
        <path d="M18.154 28.877c9.894.07 17.873-6.295 17.818-14.216C35.916 6.796 27.915.412 18.09.287L-.001.205l.105 14.703c.36 7.732 8.326 13.925 18.05 13.969" fill="#FFF" mask="url(#d)"/>
      </g>
      <g transform="translate(136 37)">
        <mask id="f" fill="#fff">
          <use xlink:href="#e"/>
        </mask>
        <path d="M.121 14.676c-.087 7.893 7.806 14.26 17.627 14.215 9.753-.045 17.669-6.428 17.824-14.268L35.673.191l-18.23.084C7.855.562.177 6.918.12 14.675" fill="#FFF" mask="url(#f)"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'AppLogo',
};
</script>

<style scoped lang="scss">
  svg {
    display: block;
    margin: 0 auto;
  }
</style>
