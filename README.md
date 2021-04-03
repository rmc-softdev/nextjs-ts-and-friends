## How to run it locally:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## Architectural decisions:

- BIG DISCLAIMER:
  The API provided is not restful. It doesn't contain an ID to identifiy each object. It doesn't allow for a specific search of a question and so on and so forth. This has led to a very weird antipattern case, where I assign the index of the element as a way to uniquely identify it, a sort of way to give it an ID. This is important because I couldn't use the question itself and slugify it to create a routing mechanism, because also the questions themselves were random, it would be rather weird. 

- This is, indeed, the main reason why I didn't use a modern approach, such as ReactQuery or SWR to cache the request and minimize the store usage. Either Redux was sort of an overkill, I however find the new hook design pattern rather ammeable so there's no harm done.

- No particular focus was given to the UI as no spec was present to such. I implemented rather the possibility for the user to edit their answer, considering a better UX. One could go further and let them see their current answe before submiting and so on so forth, but this should be enough.

If you need a UI reference, please refer to https://aniworld.netlify.app/ or my current web page at https://www.rmcsoftdev.com/
