<template>
  <div class="about">
    <h1>About</h1>
    <h2>About Real Estate</h2>
    <div class="description">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper, ipsum vel tincidunt viverra, leo diam tincidunt mauris, sit amet dictum lorem
        sapien vitae erat. Nam congue leo a ante euismod, et ultricies erat sollicitudin. Duis nec lorem blandit purus condimentum scelerisque. Etiam justo
        urna, gravida sit amet odio laoreet, feugiat lacinia purus. Maecenas vitae molestie dolor, at vestibulum dolor.
      </p>
      <p>
        Quisque ipsum odio, gravida in tincidunt quis, tincidunt a tortor. Aenean lobortis, diam in eleifend gravida, nisl neque egestas augue, in mollis nisl
        tellus ac nulla. Vivamus nec urna bibendum, dictum sapien posuere, auctor est. Vestibulum nec mi purus. Donec eget elit ac mauris rhoncus tristique.
        Maecenas efficitur vel lectus at ornare. Ut quis augue vel diam pulvinar aliquet.
      </p>
    </div>
    <h2>Design and Development</h2>
    <div class="information">
      <div class="link">
        By Erwin Pels <br />
        <a href="https://www.3rwin.nl" target="_blank" rel="noopener noreferrer">www.3rwin.nl</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
}

h1 {
  text-align: center;
  padding-bottom: 20px;
}
h2,
p {
  padding: 10px 0 10px 0;
}

.description {
  text-align: justify;
  text-justify: inter-word;
}

.information {
  display: flex;
}

.information img {
  height: 30px;
  padding-right: 15px;
}

@media screen and (min-width: 800px) {
  .about {
    width: 90%;
    max-width: 1600px;
    padding: 20px 0 20px 0;
  }
}
</style>
