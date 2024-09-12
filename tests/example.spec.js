// @ts-check
/*const { test, expect } = require('@playwright/test');

test.describe('Create user', () => {
  test('Create user', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const user = {
      username: 'susssyest',
      password: 'alohamoha23'
    };
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveTitle(/Register/)
    await page.locator('input[name="username"]').fill(user.username);
    await page.locator('input[name="password"]').fill(user.password);
    await page.getByRole('button', { name: 'submit' }).click();

    
    });
});

test.describe('Login user', () => {
  test('Login user', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const user = {
      username: 'amogus',
      password: 'sussybaka3000'
    };

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/)
    await page.locator('input[name="username"]').fill(user.username);
    await page.locator('input[name="password"]').fill(user.password);
    await page.getByRole('button', { name: 'submit' }).click();
    });

  });

  test.describe('Registering, logging in and deleting', () => {
    test('Registering, logging in and deleting', async ({ page }) => {
        const user = {
            username: 'HarryPotter',
            password: 'Alohamora1!'
        };
        await page.goto('http://localhost:3000');


        await page.getByRole('button', { name: 'Register' }).click();
        await expect(page).toHaveTitle(/Register/)
        await page.locator('input[name="username"]').fill(user.username);
        await page.locator('input[name="password"]').fill(user.password);
        await page.getByRole('button', { name: 'submit' }).click();

        await page.goto('http://localhost:3000/login');

        
        await page.locator('input[name="username"]').fill(user.username);
        await page.locator('input[name="password"]').fill(user.password);
        await page.getByRole('button', { name: 'submit' }).click();
        

        await expect(page).toHaveURL(/loggedin/);
        await expect(page).toHaveTitle(/Main/); 

        await page.locator('#deleteAccount').click();
              
    });
});


*/