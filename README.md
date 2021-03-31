## How to run it locally:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## How to test it:
# use
npm test


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architectural decisions:

- BIG DISCLAIMER:
  The API provided is not restful. It doesn't contain an ID to identifiy each object. It doesn't allow for a specific search of a question and so on and so forth. This has led to a very weird antipattern case, where I assign the index of the element as a way to uniquely identify it, a sort of way to give it an ID. This is important because I couldn't use the question itself and slugify it to create a routing mechanism, because also the questions were random themselves, it would be rather weird. 

- This is, indeed, the main reason why I didn't use a modern approach, such as ReactQuery or SWR to cache the request and minimize the store usage. Redux was an unpleasent overkill, I however find the new hook design pattern rather ammeable so there's no harm done.
