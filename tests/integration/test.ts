import { expect, test } from '@playwright/test';

test('should have Home heading in index page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
});

test('should have Post button in index page', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Post' })).toBeVisible();
});
