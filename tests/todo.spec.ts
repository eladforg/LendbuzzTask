import { test, expect } from '@playwright/test';

test.describe('Todo Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://todomvc.com/examples/react/dist/#/');
  });

  test('Test Case 1: Add New Todo', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');

    const todoItem = page.getByTestId('todo-item');
    await expect(todoItem).toHaveText('Get loan for car');
    await expect(todoItem.getByTestId('todo-item-toggle')).not.toBeChecked();
    await expect(page.locator('.todo-count')).toHaveText('1 item left!');
  });

  test('Test Case 2: Edit Existing Todo', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');

    const todoItem = page.getByTestId('todo-item');
    await todoItem.dblclick();
    const editInput = todoItem.locator('.input-container input');
    await editInput.fill('Get loan for car with Lendbuzz help');
    await editInput.press('Enter');

    await expect(todoItem).toHaveText('Get loan for car with Lendbuzz help');
  });

  test('Test Case 3: Mark Todo as Complete', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');

    await page.getByTestId('todo-item-toggle').check();
    // await expect(page.getByTestId('todo-item').locator('.completed')).toBeVisible();
    await expect(page.locator('.todo-count')).toHaveText('0 items left!');
  });

  test('Test Case 4: Mark Todo as Incomplete', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-toggle').check();

    await page.getByTestId('todo-item-toggle').uncheck();

    // await expect(page.getByTestId('todo-item').locator('.completed')).not.toBeVisible();
    await expect(page.locator('.todo-count')).toHaveText('1 item left!');
  });

  test('Test Case 5: Clear Completed Todos', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-toggle').check();

    await page.getByText('Clear completed').click();

    await expect(page.getByTestId('todo-item')).not.toBeVisible();
  });

  test('Test Case 6: Delete Todo', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Make 1st payment');
    await page.getByTestId('text-input').press('Enter');

    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(2);
    await expect(page.locator('.todo-count')).toHaveText('2 items left!');

    await todoItems.first().hover();
    await page.getByTestId('todo-item-button').first().click();

    await expect(todoItems).toHaveCount(1);
    await expect(page.locator('.todo-count')).toHaveText('1 item left!');

    await todoItems.first().hover();
    await page.getByTestId('todo-item-button').click();

    await expect(page.getByTestId('todo-item')).toHaveCount(0);
  });

  test('Test Case 7: Filter View (All)', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Make 1st payment');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-toggle').first().check();

    await page.getByText('Active').click();
    await page.locator('a', {hasText:"All"}).click();
    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(2);
  });

  test('Test Case 8: Filter View (Active)', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Make 1st payment');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-toggle').first().check();

    await page.getByText('Active').click();
    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toHaveText('Make 1st payment');
  });

  test('Test Case 9: Filter View (Completed)', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Make 1st payment');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('todo-item-toggle').first().check();

    await page.getByText('Completed').first().click();;
    const todoItems = page.getByTestId('todo-item');
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems).toHaveText('Get loan for car');
  });

  test('Test Case 10: Toggle All Todos as Complete', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Make 1st payment');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Write Thank you email to Lendbuzz');
    await page.getByTestId('text-input').press('Enter');

    await page.getByTestId('toggle-all').check();

    await expect(page.locator('[data-testid="todo-item"].completed')).toHaveCount(3);
    await expect(page.locator('.todo-count')).toHaveText('0 items left!');
  });

  test('Test Case 11: Toggle All Todos as Incomplete', async ({ page }) => {
    await page.getByTestId('text-input').fill('Get loan for car');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Make 1st payment');
    await page.getByTestId('text-input').press('Enter');
    await page.getByTestId('text-input').fill('Write Thank you email to Lendbuzz');
    await page.getByTestId('text-input').press('Enter');

    await page.getByTestId('toggle-all').check();
    await page.getByTestId('toggle-all').uncheck();

    await expect(page.locator('[data-testid="todo-item"].completed')).toHaveCount(0);
    await expect(page.locator('.todo-count')).toHaveText('3 items left!');
  });
});
