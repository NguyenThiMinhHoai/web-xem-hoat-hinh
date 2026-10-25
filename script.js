
const videos = [
    {
        id: 1,
        title: "Big Buck Bunny - Video mẫu",
        type: "mp4",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        date: "2026-10-25",
        views: 1200,
        description: "Video hoạt hình mẫu dùng để kiểm tra thẻ HTML video."
    },
    {
        id: 2,
        title: "Elephants Dream - Video mẫu",
        type: "mp4",
        url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        date: "2026-10-24",
        views: 3500,
        description: "Video mẫu để kiểm tra danh sách và chuyển đổi video."
    },
    {
        id: 3,
        title: "Video YouTube - Thử nhúng",
        type: "youtube",
        url: "M7lc1UVf-VE",
        date: "2026-10-23",
        views: 800,
        description: "Video thử nghiệm iframe YouTube, không phải phim hoạt hình."
    }
];

const listElement = document.getElementById("video-list");
const searchElement = document.getElementById("search");
const sortElement = document.getElementById("sort");
const playerElement = document.getElementById("player");

let currentVideoId = 1;

function renderVideos() {
    const keyword = searchElement.value.toLowerCase().trim();
    const sort = sortElement.value;

    const filtered = videos.filter(video =>
        video.title.toLowerCase().includes(keyword)
    );

    if (sort === "views") {
        filtered.sort((a, b) => b.views - a.views);
    } else {
        filtered.sort((a, b) =>
            b.date.localeCompare(a.date)
        );
    }

    listElement.innerHTML = "";

    if (filtered.length === 0) {
        listElement.textContent = "Không tìm thấy phim.";
        return;
    }

    filtered.forEach(video => {
        const item = document.createElement("div");
        item.className = "video-item";

        if (video.id === currentVideoId) {
            item.classList.add("active");
        }

        const title = document.createElement("h3");
        title.textContent = video.title;

        const info = document.createElement("p");
        info.textContent =
            video.views.toLocaleString("vi-VN") + " lượt xem (dữ liệu mẫu)";

        item.append(title, info);

        item.addEventListener("click", () => {
            playVideo(video);
        });

        listElement.appendChild(item);
    });
}

function playVideo(video) {
    currentVideoId = video.id;

    document.getElementById("video-title").textContent =
        video.title;

    document.getElementById("video-info").textContent =
        video.views.toLocaleString("vi-VN") +
        " lượt xem (dữ liệu mẫu)";

    document.getElementById("video-description").textContent =
        video.description;

    playerElement.innerHTML = "";

    if (video.type === "youtube") {
        const iframe = document.createElement("iframe");
        iframe.src =
            "https://www.youtube-nocookie.com/embed/" +
            encodeURIComponent(video.url);
        iframe.title = video.title;
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        playerElement.appendChild(iframe);
    } else {
        const player = document.createElement("video");
        player.controls = true;
        player.preload = "metadata";

        const source = document.createElement("source");
        source.src = video.url;
        source.type = "video/mp4";

        player.appendChild(source);
        playerElement.appendChild(player);
    }

    renderVideos();
}

searchElement.addEventListener("input", renderVideos);
sortElement.addEventListener("change", renderVideos);

playVideo(videos[0]);
