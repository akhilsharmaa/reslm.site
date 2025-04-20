## TODOS: 
- [x] Authentication: login/register system using JWT.
  - [ ] All credit limits to the LLM. 
  - [ ] Add Auth2.0 (goggle)
  - [ ] send email on signup to the user. 
- [x] **PDF Upload:** file upload functionality using multer to accept PDF files
- [X] **Convert PDF to Image Thumbnail**: Convert uploaded PDFs into a single image as first page. 
- [x] **Upload to S3 Bucket**: Store the image in S3 and get a viewable public URL.
  - [x] save file data (metadata) in the database simultaneously.
  - [ ] delete the image + pdf for local storage. 
- [x] **Generate Embedding on Upload**: Use OpenAI embeddings for each uploaded document.
- [x] **Storing Embeddings in PostgreSQL**: Save embeddings using `pgvector` for fast similarity search.
- [x] **SSE with Live LLM Output**: Stream LLM responses in real-time using Server-Sent Events,
  - [x] create Short live token, for SSE request (as they don't support bearear token)
  - [x] save chats in the database simultaneously.
- [x] Create embedding for user prompt
- [x] Fetch nearest chunks from stored embeddings
- [x] Combine prompt + chunks
- [x] Send to LLM for grounded response
- [ ] User credit score: fuctionality to limit the chat per user.
- [ ] **Delete PDF**: allowing users to delete the PDF.
  - [ ] delete the embedding+chunks of the upload.
  - [ ] delete the image thumbnail from s3 bucket.
  - [ ] delete complete metadata of upload.
### Important: 
- [ ] **Deployment:**
  - [x] Setup Docker for production: 
  - [x] CI pipeline 
  - [x] migrate local to cloud Postgre database
  - [ ] migrate cloud postgre to docker based postgres (using docker-compose). 
---

**Server Setup**
1. Create EC2 instance atleat ()
[https://docs.docker.com/engine/install/ubuntu/](docker docs)
```
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo apt install docker-compose
```

2. Now assign the elastic-ip to the EC2 you have created. 
