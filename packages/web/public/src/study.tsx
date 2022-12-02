type Card = {
    term: string,
    definition: string
}

type StudySet = {
    title: string,
    cards: Card[]
}

type ApiResponse = {
    success: boolean,
    data?: StudySet,
    error?: string
}

type Game = "Learn" | "Test"

function Err() {
    return (
        <div>
            <h1>Error!</h1>
        </div>
    )
}

function LearnGame() {
    return (
        <div id="game-container"></div>
    )
}
function TestGame() {
    return (
        <div id="game-container"></div>
    )
}

function Game({game, studyset, url}: {game: Game, studyset: StudySet, url: string}) {
    return (
        <nav>
            <div id="game-label" onclick={() => document.getElementById('game-dropdown').classList.toggle('shown')}>
                <div className="label">
                    <span>{game}</span>
                    <span>
                        <img src="public/chevron-down.png" />
                    </span>
                </div>
                <div className="dropdown" id="game-dropdown">
                    <div>
                        <div className="dropdown-section">
                            <span>
                                <img src="public/learn.png" />
                                <p>Learn</p>
                            </span>
                            <span>
                                <img src="public/test.png" />
                                <p>Test</p>
                            </span>
                        </div>
                        <div className="dropdown-section">
                            <span>Home</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="right">
                <button class="btn hollow" onclick={() => {populate(Study, {studyset, url})}}>
                    &times;
                </button>
            </div>
            {game == "Learn" ? LearnGame() : TestGame()}
        </nav>
    )
}

function Nav() {
    return (
        <nav>
            <a id="title" href="/">
                Quizlet Free
            </a>
            <div id="right">
                <a href="https://github.com/sqwyer/quizlet-free" id="github-link" target="_blank">
                    <img src="public/github.png" />
                </a>
            </div>
        </nav>
    )
}

function Study({studyset, url}: {studyset: StudySet, url: string}) {
    return (
        <div>
            {Nav()}
            <div className="studyset">
                <h1>{studyset.title}</h1>
                <div className="row">
                    <p>{studyset.cards.length} cards</p>
                    <a href={url} target="_blank" className="link">Open in Quizlet</a>
                </div>
                <div className="row nav">
                    <div className="game" onclick={() => {populate(Game, {game: 'Learn', studyset, url})}}>
                        <span>Learn</span>
                    </div>
                    <div className="game">
                        <span>Test</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function populate<T>(component: (props: T) => any, props?: T, parent?: string) {
    const container = document.getElementById(parent ?? 'content');
    [...container.children].forEach(child => child.remove());
    container.append(component(props))
}

(async function() {
    try {
        const url = new URLSearchParams(window.location.search).get("url");
        const res: ApiResponse = await (await fetch(`/api/get_set?url=${url}`)).json();
        if(res.error) populate(Err);
        else populate(Study, {studyset: res.data, url});
    } catch(err) {
        console.error(err);
    }
})();

document.addEventListener('click', event => {
    console.log(event.target);
})