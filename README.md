## TODOS: 

- [x] **Authentication**: login system using JWT.
- [x] **PDF Upload:** file upload functionality using multer to accept PDF files
- [X] **Convert PDF to Image Thumbnail**: Convert uploaded PDFs into a single image as first page. 
- [x] **Upload to AWS S3**: Store the image in S3 and get a viewable public URL.
  - [x] save file data (metadata) in the database simultaneously.
- [x] **Generate Embedding on Upload**: Use OpenAI embeddings for each uploaded document.
- [x] **Storing Embeddings in PostgreSQL**: Save embeddings using `pgvector` for fast similarity search.
- [x] **SSE with Live LLM Output**: Stream LLM responses in real-time using Server-Sent Events,
  - [x] create Short live token, for SSE request (as they don't support bearear token)
  - [x] save chats in the database simultaneously.
- [ ] Create embedding for user prompt
- [ ] Fetch nearest chunks from stored embeddings
- [ ] Combine prompt + chunks
- [ ] Send to LLM for grounded response
