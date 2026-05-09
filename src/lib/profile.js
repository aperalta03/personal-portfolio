import data from './profile.json';

export default data;

export const identity = data.identity;
export const hero = data.hero;
export const about = data.about;
export const now = data.now;
export const work = data.work;
export const resume = data.resume;
export const contact = data.contact;
export const constellation = data.constellation;
export const links = data.links;
export const nav = data.nav;

export const PROFILE = {
  ...identity,
  email: identity.email,
  github: identity.github,
  linkedin: identity.linkedin,
  nodes: constellation.nodes,
  edges: constellation.edges,
  works: work.items,
  links,
  nav,
};
