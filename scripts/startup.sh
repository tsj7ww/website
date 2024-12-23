git clone https://github.com/tsj7ww/website.git
cd website

# Build and run the Docker container
docker-compose up --build
docker exec -it website bash

# Build hugo static files
hugo -D # drafts
hugo # no drafts

# Inside the blog/ folder, initialize Hugo
hugo new site blog
cd blog
# Add a theme
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperModgit submodule update --init --recursive
# Create blog posts
hugo new posts/first-post.md