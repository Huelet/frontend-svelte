
<style>
  /* You can add custom styles here */
  .container {
    position: relative;
    min-height: 100vh; /* Make the container take up the full viewport height */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Distribute space between title and buttons, and between buttons and footer */
    align-items: center;
    text-align: center;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 16px; /* Add more space between title and buttons */
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
    color: #888;
    margin-top: 20px; /* Move the footer back to the bottom */
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
      <button>TERMS & CONDITIONS
 </button>

      <button>Privacy Policy</button>

      <button>What do the verified badges mean?</button>

    </div>
    <div class="button-row">
      <button>Content policies</button>

      <button>Getting Started as a Creator</button>
    </div>
  </div>

  <div class="footer">
    © 2023 Shards Social Inc.
  </div>
</div>


