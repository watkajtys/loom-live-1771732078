import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 1200})
    page = context.new_page()
    
    # Navigate to the app
    page.goto("http://localhost:5173/")
    
    # Wait for the board to load (tasks should be visible)
    # Check for "Frontend Impl." task
    page.wait_for_selector('text="Frontend Impl."')
    
    # Scroll to the interesting part (around 10:00 - 14:00)
    # 10:00 is 600px. 14:00 is 840px.
    # The container is scrollable.
    # .cyber-scrollbar
    
    # Take a screenshot of the whole visible area first
    page.screenshot(path="verification_full.png")
    
    # Try to scroll the timeline container to see "Frontend Impl." better if it's cut off
    # The container ID is "timeline-container" but the scrollable element is the parent div with class "cyber-scrollbar"
    # Let's target the element with class "cyber-scrollbar" and scroll it.
    
    # Find the scrollable container
    # It's the one with class "flex-1 overflow-y-auto cyber-scrollbar relative"
    # We can execute javascript to scroll it.
    
    page.evaluate("""
        const container = document.querySelector('.cyber-scrollbar');
        if (container) {
            container.scrollTop = 500; // Scroll to around 08:00
        }
    """)
    time.sleep(1)
    page.screenshot(path="verification_scroll_morning.png")

    page.evaluate("""
        const container = document.querySelector('.cyber-scrollbar');
        if (container) {
            container.scrollTop = 700; // Scroll to around 12:00
        }
    """)
    time.sleep(1)
    page.screenshot(path="verification_scroll_noon.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
