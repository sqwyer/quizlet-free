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

function Err() {
    return (
        <div>
            <h1>Error!</h1>
        </div>
    )
}

function Study(studyset: StudySet, url: string) {
    return (
        <div className="studyset">
            <h1>{studyset.title}</h1>
            <div className="row">
                <p>{studyset.cards.length} cards</p>
                <a href={url} target="_blank" className="link">Open in Quizlet</a>
            </div>
            <div className="row nav">
                <div className="game">
                    <span>Learn</span>
                </div>
                <div className="game">
                    <span>Test</span>
                </div>
            </div>
        </div>
    )
}

function populate(res: ApiResponse, url: string) {
    const container = document.getElementById('content');
    [...container.children].forEach(child => child.remove());

    if(res.error) {
        container.append(Err())
    } else {
        container.append(Study(res.data, url))
    }
}

(async function() {
    try {
        const url = new URLSearchParams(window.location.search).get("url");
        const studyset: ApiResponse = await (await fetch(`/api/get_set?url=${url}`)).json();
        populate(studyset, url);
    } catch(err) {
        console.error(err);
    }
})();