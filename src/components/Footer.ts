let locations = [
    'Earth',
    'Moon, Earth',
    'Mars',
    'Deimos, Mars',
    'Phobos, Mars',
    'Jupiter',
    'Amalthea, Jupiter',
    'Callisto, Jupiter',
    'Europa, Jupiter',
    'Ganymede, Jupiter',
    'Io, Jupiter',
    'Saturn',
    'Dione, Saturn',
    'Enceladus, Saturn',
    'Hyperion, Saturn',
    'Iapetus, Saturn',
    'Mimas, Saturn',
    'Phoebe, Saturn',
    'Rhea, Saturn',
    'Tethys, Saturn',
    'Titan, Saturn',
    'Neptune',
    'Nereid, Neptune',
    'Triton, Neptune',
    'Pluto',
    'Charon, Pluto'
];

export function getEpoch() {
    return 'Holocene';
}

export function getLocation() {
    let loc = Math.floor(Math.random() * locations.length);
    return locations[loc];
}