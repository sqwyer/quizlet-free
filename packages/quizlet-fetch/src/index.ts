import puppeteer from "puppeteer"

export type Card = {
    term: string,
    definition: string
}

export type StudySet = {
    title: string,
    cards: Card[]
}

export async function load(url: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);
    
    const title = await page.$eval("title", el => el.innerText.replace(" Flashcards | Quizlet", ""));
    const terms = await page.$$eval('.TermText', el => el.map(self => self.innerHTML));
    let cards: Card[] = [];

    for(let i = 0; i < terms.length; i+=2) {
        cards.push({
            term: terms[i],
            definition: terms[i+1]
        })
    }

    await browser.close();

    return {
        title,
        cards
    } as StudySet;
}