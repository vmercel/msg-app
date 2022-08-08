const MESSAGES = [{
        "id": 1,
        "subject": "Hello Friend",
        "content": "Hello friend, where you been so long?  Time goes by, so easy it sleeps away  Just like a shadow at the end of the day Hello friend, how are things for you these days? Some guy from way-back-when, he mentioned your name Did he ever get back to you? Ah, you know I told him to",
        "isRead": false,
        "owner": "Mercel"
    },
    {
        "id": 2,
        "subject": "Me Again",
        "content": "From the outside looking in, Rich Chaplin (David A.R. White) has everything that any Pastor and family man could ever want. In reality he has lost sight of everything that matters the most, including his family. When he wishes for a life other than his own, he suddenly finds himself trapped within the lives of everyone his apathy has affected.",
        "isRead": false,
        "owner": "Mercel"
    },
    {
        "id": 3,
        "subject": "How far?",
        "content": "This unforgettable journey brings Rich to view life through the eyes of a diverse cast of characters including an elderly woman (Della Reese), a top fashion model (Logan White), his own wife (Ali Landry) and even a goldfish! It might even take an encounter with a strangely familiar angel, (Bruce McGill) to help him realize that he is wasting his chance to love and impact the most important people in his life. Join Rich as he finds himself on a wild and hilarious ride that will change his life forever.",
        "isRead": false,
        "owner": "Mercel"
    },
    {
        "id": 4,
        "subject": "I am ok",
        "content": "Have you ever wondered who wrote the books in your Bible and how they ended up together? Has anyone ever told you that some books were cut out of the Bible or that the stories of Jesus in the Gospels can\'t be trusted? Through these six sessions, Dr. Timothy Paul Jones will answer your questions about how we got the Bible. ",
        "isRead": true,
        "owner": "Mercel"
    },
    {
        "id": 5,
        "subject": "Confirm date",
        "content": "Hi, please confirm if we are still going on the trip together Do you remember sitting in school and being forced to watch ancient educational films about crop rotation, the circulatory system, and how to protect yourself against nuclear attack? No matter how horrific the subject (and crop rotation can get nasty), the film always comforted us by featuring the guidance of a kindly, bow-tied Professor, who always had an answer for everything. Wouldn\'t it have been great if those films had been about something you truly cared about - like dating",
        "isRead": true,
        "owner": "Mercel"
    },
    {
        "id": 6,
        "subject": "Thanks for the outing",
        "content": "Had fun, I hope we do this again. If you are not completely satisfied with this film, you may well have tested average or higher in school. Let that be your consolation, because there\'s no chance of you ever getting any of your money back. ",
        "isRead": true,
        "owner": "Mercel"
    },
    {
        "id": 7,
        "subject": "A random quote",
        "content": "Roses are pink berries are blue, lies are easy to believe",
        "isRead": true,
        "owner": "Mercel"
    },
    {
        "id": 123456789,
        "subject": "No New Msg",
        "content": "Your Inbox is empty. You will be notified when a new message is received. ",
        "isRead": true,
        "owner": "Undefined"
    }
];







export function getMessages() {
    return MESSAGES;
}

export function getMessage(id) {
    return MESSAGES.find((message) => (message.id == id));
}

export function getMessagesByOwner(owner) {
    const temp = MESSAGES.filter((message) => (message.owner == owner));
    if (temp.length == 0) {
        return MESSAGES.filter((message) => (message.owner == "Undefined"));
    }else{
        return temp;
    }
}