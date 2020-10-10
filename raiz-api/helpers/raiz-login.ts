import { Browser } from 'puppeteer'

const login = async (browser: Browser): Promise<string> => {
    if (!process.env.USER_EMAIL) {
        throw new Error("Please set email");
    }

    if (!process.env.USER_PASSWORD) {
        throw new Error("Please set password");
    }

    const page = await browser.newPage();
    await page.goto('https://app.raizinvest.com.au/login')
    await page.waitForSelector('input[name=email]');
    await page.type('input[name=email]', process.env.USER_EMAIL);
    await page.type('input[name=password]', process.env.USER_PASSWORD);
    await page.click('button[type=submit]');

    const [response] = await Promise.all([
        page.waitForResponse(response => response.url().includes('https://api-app.acornsau.com.au/v1/sessions'))
    ]);

    try {
        const dataObj = await response.json();
        console.log(dataObj);
    } catch (err) {
        console.log(err)
    }
    
    return '';
}

interface TokenResponse {
    token: string;
    persisten_token: string;
    user_uuid: string
}

export { login };