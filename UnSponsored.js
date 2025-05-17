chrome.storage.sync.get('enabled', function (data) {
  var isEnabled = data.enabled;
  if (isEnabled === undefined) {
    isEnabled = true; // Default to true if the value is not set
  }

  if (isEnabled) {
    hideSponsoredElements();
  }
});

function hideSponsoredElements() {
  // Google ad selectors
  // Hides text ads that appear at the top and bottom of search results
  let textAdElements = document.querySelectorAll('[data-text-ad="1"]');
  textAdElements.forEach(element => {
    // Store computed display value before hiding
    element.dataset.originalDisplay = window.getComputedStyle(element).display;
    element.style.display = 'none';
  });

  // Hides "Sponsored" links that appear in search results
  let isAdElements = document.querySelectorAll('[data-is-ad="1"]');
  isAdElements.forEach(element => {
    element.dataset.originalDisplay = window.getComputedStyle(element).display;
    element.style.display = 'none';
  });

  // Startpage ad selectors
  // Hides sponsored search results marked with data-ad-container
  let startpageAdContainers = document.querySelectorAll('[data-ad-container="1"]');
  startpageAdContainers.forEach(element => {
    element.dataset.originalDisplay = window.getComputedStyle(element).display;
    element.style.display = 'none';
  });

  // Hides sponsored content containers in top and bottom areas
  let adDivs = document.querySelectorAll('#gcsa-top, #gcsa-bottom, #gcsa-aylf-sidebar');
  adDivs.forEach(element => {
    element.dataset.originalDisplay = window.getComputedStyle(element).display;
    element.style.display = 'none';
  });

  console.log('[Google] Number of [data-text-ad="1"] elements hidden:', textAdElements.length);
  console.log('[Google] Number of [data-is-ad="1"] elements hidden:', isAdElements.length);
  console.log('[Startpage] Number of [data-ad-container="1"] elements hidden:', startpageAdContainers.length);
  console.log('[Startpage] Number of gcsa-* container elements hidden:', adDivs.length);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.enabled) {
    hideSponsoredElements();
  } else {
    showSponsoredElements();
  }
});

function showSponsoredElements() {
  // Google ad selectors
  let textAdElements = document.querySelectorAll('[data-text-ad="1"]');
  textAdElements.forEach(element => {
    element.style.display = element.dataset.originalDisplay || '';
  });

  let isAdElements = document.querySelectorAll('[data-is-ad="1"]');
  isAdElements.forEach(element => {
    element.style.display = element.dataset.originalDisplay || '';
  });

  // Startpage ad selectors
  let startpageAdContainers = document.querySelectorAll('[data-ad-container="1"]');
  startpageAdContainers.forEach(element => {
    element.style.display = element.dataset.originalDisplay || '';
  });

  let adDivs = document.querySelectorAll('#gcsa-top, #gcsa-bottom');
  adDivs.forEach(element => {
    element.style.display = element.dataset.originalDisplay || '';
  });

  console.log('[Google] Number of [data-text-ad="1"] elements shown:', textAdElements.length);
  console.log('[Google] Number of [data-is-ad="1"] elements shown:', isAdElements.length);
  console.log('[Startpage] Number of [data-ad-container="1"] elements shown:', startpageAdContainers.length);
  console.log('[Startpage] Number of gcsa-* container elements shown:', adDivs.length);
}
