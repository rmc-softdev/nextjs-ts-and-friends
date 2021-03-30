## How to run it locally:

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architectural decisions:

- BIG DISCLAIMER:
  The API provided is not restful. It doesn't contain an ID to identifiy each object. It doesn't allow for a specific search of a question and so on and so forth. This has led to a very weird antipattern case, where I assign the index of the element as a way to uniquely identify it, a sort of way to give it an ID. This is important because I couldn't use the question itself and slugify it to create a routing mechanism, because also the questions were random themselves, it would be rather weird. 

This would naturally lead to a desigon of a format saying something previous question, current question, next question, however this is not the UI provided in the test. As such, I adapted it so it would still look good, despite not being optmized, with a caching library such as React Query.
