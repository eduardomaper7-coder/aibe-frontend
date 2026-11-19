// Service worker kept only so the site stays installable as a PWA.
// No fetch handler on purpose: an empty one forces every request (incl. the animation clips)
// through the worker for nothing, which slows the page down on phones.
