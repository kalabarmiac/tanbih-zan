import re
from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # 1. Navigate to the landing page.
    page.goto("http://localhost:3000/")
    expect(page).to_have_title(re.compile("Emergent | Fullstack App"))

    # 2. Navigate to the onboarding page and create a new user.
    page.get_by_test_id("get-started-btn").click()
    page.wait_for_url("http://localhost:3000/onboarding")

    page.get_by_test_id("name-input").fill("Jules")
    page.get_by_test_id("occupation-select").click()
    page.get_by_text("Student").click()
    page.get_by_test_id("next-btn").click()

    page.get_by_test_id("wellness-select").click()
    page.get_by_text("Peaceful & Content").click()
    page.get_by_test_id("next-btn").click()

    page.get_by_test_id("city-input").fill("New York")
    page.get_by_test_id("country-input").fill("USA")
    page.get_by_test_id("next-btn").click()

    page.get_by_test_id("complete-onboarding-btn").click()
    page.wait_for_url("http://localhost:3000/dashboard", timeout=60000)

    # 3. Navigate to the dashboard and verify that the prayer times and tasks are displayed.
    expect(page.get_by_test_id("prayer-times-grid")).to_be_visible()
    expect(page.get_by_test_id("tasks-list")).to_be_visible()

    # 4. Navigate to the Hadith page, select a collection, and verify that the Hadith are displayed with pagination.
    page.get_by_test_id("nav-hadith").click()
    page.wait_for_url("http://localhost:3000/hadith")
    page.get_by_text("Sahih al-Bukhari").click()
    expect(page.get_by_text("Hadith 1")).to_be_visible()
    page.get_by_role("button", name="Next").click()
    expect(page.get_by_text("Hadith 21")).to_be_visible()

    # 5. Navigate to the settings page and verify that the user's information is displayed correctly.
    page.get_by_test_id("nav-settings").click()
    page.wait_for_url("http://localhost:3000/settings")
    expect(page.get_by_display_value("Jules")).to_be_visible()
    expect(page.get_by_display_value("student")).to_be_visible()
    expect(page.get_by_display_value("New York")).to_be_visible()
    expect(page.get_by_display_value("USA")).to_be_visible()

    # 6. Take a screenshot of the settings page.
    page.screenshot(path="jules-scratch/verification/verification.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)