const membershipLabels = {
    1: { text: 'Member', className: 'badge--member' },
    2: { text: 'Silver', className: 'badge--silver' },
    3: { text: 'Gold', className: 'badge--gold' }
};

const memberContainer = document.querySelector('#member-container');
const gridButton = document.querySelector('#grid-view-btn');
const listButton = document.querySelector('#list-view-btn');
const memberCountEl = document.querySelector('#member-count');

async function getMemberData() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Unable to fetch member data:', error);
        memberContainer.innerHTML = '<p>Sorry, member information could not be loaded right now.</p>';
        return [];
    }
}

function buildMemberCard(member) {
    const level = membershipLabels[member.membership] ?? membershipLabels[1];

    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <div class="member-card__header">
            <p class="member-card__name">${member.name}</p>
            <span class="badge ${level.className}">${level.text}</span>
        </div>
        <p class="member-card__category">${member.category}</p>
        <p class="member-card__tagline">${member.tagline}</p>
        <div class="member-card__contact">
            <span>${member.address}</span>
            <span>${member.phone}</span>
            <a href="${member.url}" target="_blank" rel="noopener">Visit website</a>
        </div>
    `;

    return card;
}

function displayMembers(members) {
    memberContainer.innerHTML = '';
    members.forEach((member) => {
        memberContainer.appendChild(buildMemberCard(member));
    });
    memberCountEl.textContent = `${members.length} chamber members`;
}

function setActiveView(view) {
    if (view === 'list') {
        memberContainer.classList.add('list-view');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    } else {
        memberContainer.classList.remove('list-view');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    }
}

gridButton.addEventListener('click', () => setActiveView('grid'));
listButton.addEventListener('click', () => setActiveView('list'));

async function init() {
    const members = await getMemberData();
    displayMembers(members);
}

init();
