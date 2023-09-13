

<style>
  /* You can add custom styles here */
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Make the container take up the full viewport height */
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  button {
    width: 259px;
    height: 125px;
  }

  .footer {
    margin-top: auto; /* Push the footer to the bottom */
    color: #888;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
  }
</style>

<div class="container">
  <div class="title">
    Shards Social Information Center
  </div>

  <div class="button-container">
    <div class="button-row">
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </div>
    <div class="button-row">
      <button>Button 4</button>
      <button>Button 5</button>
    </div>
  </div>
  <div class="footer">
  © 2023 Shards Social Inc.
</div>
</div>



