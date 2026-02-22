from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        
        print("Navigating to app...")
        page.goto("http://localhost:5173")
        
        # Wait for threads to load
        page.wait_for_selector("text=Project Alpha: Deep Work")
        print("App loaded.")
        
        # 1. Test Scalpel Mode Activation
        print("Pressing Alt...")
        page.keyboard.down("Alt")
        
        # Move mouse over "Project Alpha" thread
        # It starts at 09:00 (540 mins). 540px top.
        # Let's target somewhere in the middle.
        # The timeline container is relative.
        # We can find the element and hover.
        thread = page.locator("text=Project Alpha: Deep Work").first
        thread_box = thread.bounding_box()
        
        if thread_box:
            print(f"Hovering over thread at {thread_box['x'] + 50}, {thread_box['y'] + 50}")
            page.mouse.move(thread_box['x'] + 50, thread_box['y'] + 50)
            
            # Wait for visual update (cursor, split line)
            time.sleep(1)
            
            print("Taking screenshot of Scalpel Mode...")
            page.screenshot(path="verification_scalpel_hover.png")
            
            # 2. Test Split
            print("Clicking to split...")
            page.mouse.click(thread_box['x'] + 50, thread_box['y'] + 50)
            
            # Release Alt
            page.keyboard.up("Alt")
            
            # Wait for split to happen
            time.sleep(1)
            
            print("Taking screenshot of Split Result...")
            page.screenshot(path="verification_split_result.png")
            
        else:
            print("Could not find thread element.")
        
        browser.close()

if __name__ == "__main__":
    run()
