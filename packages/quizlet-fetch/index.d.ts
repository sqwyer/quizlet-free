declare module "quizlet-fetch" {
    export type Card = {
        term: string,
        definition: string
    }
    export type StudySet = {
        title: string,
        cards: Card[]
    }
    export function load(url: string): Promise<any>
}