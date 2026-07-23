const membershipLabels = {
    2: { text: 'Silver', className: 'badge--silver' },
    3: { text: 'Gold', className: 'badge--gold' }
};

const spotlightContainer = document.querySelector('#spotlight-container');

async function getMembers() {
    const response = await fetch('data/members.json');
    return await response.json();
}

function pickRandomSpotlights(members) {
    const eligible = members.filter((member) => member.membership === 2 || member.membership === 3);

    // Shuffle using the Fisher-Yates algorithm
    for (let i = eligible.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
    }

    const howMany = Math.random() < 0.5 ? 2 : 3;
    return eligible.slice(0, howMany);
}

function buildSpotlightCard(member) {
    const level = membershipLabels[member.membership];

    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <div class="spotlight-card__body">
            <div class="spotlight-card__header">
                <p class="spotlight-card__name">${member.name}</p>
                <span class="badge ${level.className}">${level.text}</span>
            </div>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.url}" target="_blank" rel="noopener">Visit website</a>
        </div>
    `;
    return card;
}

async function initSpotlights() {
    try {
        const members = await getMembers();
        const spotlights = pickRandomSpotlights(members);

        spotlightContainer.innerHTML = '';
        spotlights.forEach((member) => {
            spotlightContainer.appendChild(buildSpotlightCard(member));
        });
    } catch (error) {
        console.error('Unable to load member spotlights:', error);
        spotlightContainer.innerHTML = '<p>Member spotlights are currently unavailable.</p>';
    }
}

initSpotlights();
