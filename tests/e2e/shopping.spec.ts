import { expect, test, type Page } from "@playwright/test";

const sizeButton = (page: Page, size: string) => page.getByRole("group", { name: "Size" }).getByRole("button", { name: size, exact: true });
const bagButton = (page: Page) => page.getByRole("button", { name: /^Bag, \d+ items?$/ });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("home serves the right hero image for the viewport", async ({ page, isMobile }) => {
  await page.goto("/");
  const src = await page.locator(".hero__media img").evaluate((img: HTMLImageElement) => img.currentSrc);
  expect(src).toContain(isMobile ? "hero-mobile" : "hero-campaign");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/A new\s*point\s*of view/i);
});

test("add to bag requires a size, then opens the bag drawer", async ({ page }) => {
  await page.goto("/product/rust-tailoring");
  const add = page.locator(".buy").getByRole("button", { name: "Add to bag" });
  await add.click();
  await expect(page.getByText("Choose a size to add this look to your bag.")).toBeVisible();
  await expect(sizeButton(page, "XS")).toBeFocused();

  await sizeButton(page, "M").click();
  await page.locator(".buy").getByRole("button", { name: "Increase quantity" }).click();
  await add.click();
  const drawer = page.getByRole("dialog");
  await expect(drawer.getByRole("status")).toContainText("The Rust Tailoring Look, size M");
  await expect(drawer).toContainText("29,000");

  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(add).toBeFocused();
});

test("bag persists across reloads and keeps sizes as separate lines", async ({ page }) => {
  await page.goto("/product/olive-dress");
  await sizeButton(page, "S").click();
  await page.locator(".buy").getByRole("button", { name: "Add to bag" }).click();
  await page.keyboard.press("Escape");
  await sizeButton(page, "L").click();
  await page.locator(".buy").getByRole("button", { name: "Add to bag" }).click();
  await page.keyboard.press("Escape");

  await page.reload();
  await expect(bagButton(page)).toHaveAccessibleName("Bag, 2 items");

  await page.goto("/bag");
  await expect(page.locator(".line")).toHaveCount(2);
  await page.locator(".line").first().getByRole("button", { name: /^Remove/ }).click();
  await expect(page.locator(".line")).toHaveCount(1);
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.locator("#checkout-note")).toHaveAttribute("role", "status");
});

test("saved pieces can be added and removed", async ({ page }) => {
  await page.goto("/product/sand-trench");
  await page.locator(".buy").getByRole("button", { name: "Save The Sand Trench Look" }).click();
  await page.goto("/saved");
  await expect(page.locator(".saved-grid")).toContainText("The Sand Trench Look");
  await page.getByRole("button", { name: "Remove The Sand Trench Look from saved pieces" }).click();
  await expect(page.getByRole("heading", { name: "Nothing saved yet" })).toBeVisible();
});

test("search finds looks by colour and opens a result from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search" }).click();
  const input = page.getByRole("combobox");
  await expect(input).toBeFocused();
  await input.fill("ivory");
  await expect(page.getByRole("option")).toHaveCount(3);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/product\/striped-shirt$/);
});

test("shop filters, sorts and recovers from no results", async ({ page }) => {
  await page.goto("/shop");
  await expect(page.locator(".pgrid .card")).toHaveCount(8);
  await page.getByRole("link", { name: /^Tailoring/ }).first().click();
  await expect(page).toHaveURL(/category=tailoring/);
  await expect(page.locator(".pgrid .card")).toHaveCount(2);

  await page.goto("/shop?category=everyday&sort=price-asc");
  await expect(page.locator(".pgrid .card")).toHaveCount(4); // wait for URL filters to apply
  const prices = await page.locator(".pgrid .card .price .sr-only").allTextContents();
  const values = prices.map((p) => Number(p.replace(/\D/g, "")));
  expect(values).toEqual([...values].sort((a, b) => a - b));

  await page.goto("/shop?q=zzz");
  await expect(page.getByRole("heading", { name: "No looks match these filters" })).toBeVisible();
  await page.getByRole("button", { name: "Clear all" }).click();
  await expect(page.locator(".pgrid .card")).toHaveCount(8);
});

test("filter drawer previews the result count before applying", async ({ page, isMobile }) => {
  await page.goto("/shop");
  await page.getByRole("button", { name: isMobile ? /Filter & sort/ : /^Filter/ }).click();
  const drawer = page.getByRole("dialog", { name: /Filter & sort/ });
  await drawer.getByRole("checkbox", { name: /^Dresses/ }).check();
  await expect(drawer.getByRole("button", { name: "Show 2 looks" })).toBeVisible();
  await drawer.getByRole("button", { name: "Show 2 looks" }).click();
  await expect(page).toHaveURL(/category=dresses/);
  await expect(page.locator(".pgrid .card")).toHaveCount(2);
});

test("newsletter validates and never pretends to subscribe", async ({ page }) => {
  await page.goto("/");
  const email = page.getByLabel("Email address");
  const submit = page.getByRole("button", { name: "Sign up" });
  await submit.click();
  await expect(page.locator("#newsletter-msg")).toContainText("Enter your email address.");
  await email.fill("maya@example");
  await submit.click();
  await expect(page.locator("#newsletter-msg")).toContainText("name@example.com");
  await email.fill("maya@example.com");
  await submit.click();
  await expect(page.locator("#newsletter-msg")).toContainText("Demo only—your email has not been submitted.");
});

test("mobile menu navigates and releases the scroll lock", async ({ page, isMobile }) => {
  test.skip(!isMobile, "The menu drawer is mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("");
});

for (const path of ["/", "/shop", "/product/sand-trench", "/about", "/bag", "/saved"]) {
  test(`no horizontal overflow on ${path} at 320px`, async ({ page, isMobile }) => {
    test.skip(!isMobile, "Checked once at the narrowest width");
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}
