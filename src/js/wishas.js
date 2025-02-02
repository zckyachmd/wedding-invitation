import {
  formattedDate,
  formattedName,
  generateRandomColor,
  generateRandomId,
  getCurrentDateTime,
  renderElement,
} from "../utils/helper.js";
import { data } from "../assets/data/data.js";
import { badWordsList } from "../assets/data/badwords.js";
import { comentarService } from "../services/comentarService.js";

export const wishas = () => {
  const wishasContainer = document.querySelector(".wishas");
  const [_, form] = wishasContainer.children[2].children;
  const [peopleComentar, ___, containerComentar] =
    wishasContainer.children[3].children;
  const buttonForm = form.children[6];
  const pageNumber = wishasContainer.querySelector(".page-number");
  const [prevButton, nextButton] = wishasContainer.querySelectorAll(
    ".button-grup button"
  );

  const listItemBank = (data) =>
    `  <figure data-aos="zoom-in" data-aos-duration="1000">
                <img src=${data.icon} alt="bank icon animation">
                <figcaption>No. Rekening ${data.rekening.slice(
                  0,
                  4
                )}xxxx <br>A.n ${data.name}</figcaption>
                <button data-rekening=${
                  data.rekening
                } aria-label="copy rekening">Salin No. Rekening</button>
           </figure>`;

  const initialBank = () => {
    const wishasBank = wishasContainer.children[1];
    const [_, __, containerBank] = wishasBank.children;

    renderElement(data.bank, containerBank, listItemBank);

    containerBank.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const rekening = e.target.dataset.rekening;
        try {
          await navigator.clipboard.writeText(rekening);
          button.textContent = "Berhasil menyalin";
        } catch (error) {
          console.log(`Error : ${error.message}`);
        } finally {
          setTimeout(() => {
            button.textContent = "Salin No. Rekening";
          }, 2000);
        }
      });
    });
  };

  const listItemComentar = (data) => {
    const name = formattedName(data.name);
    const newDate = formattedDate(data.date);
    let date = "";

    if (newDate.days < 1) {
      if (newDate.hours < 1) {
        date = `${newDate.minutes} menit yang lalu`;
      } else {
        date = `${newDate.hours} jam, ${newDate.minutes} menit yang lalu`;
      }
    } else {
      date = `${newDate.days} hari, ${newDate.hours} jam yang lalu`;
    }

    return ` <li data-aos="zoom-in" data-aos-duration="1000">
                     <div style="background-color: ${data.color}">${data.name
      .charAt(0)
      .toUpperCase()}</div>
                     <div>
                         <h4>${name}</h4>
                         <p>${date} <br>${data.status}</p>
                         <p>${data.message}</p>
                     </div>
                 </li>`;
  };

  let lengthComentar;

  const initialComentar = async () => {
    containerComentar.innerHTML = `<h1 style="font-size: 1rem; margin: auto">Loading...</h1>`;
    peopleComentar.textContent = "...";
    pageNumber.textContent = "..";

    try {
      const response = await comentarService.getComentar();
      const { comentar } = response;

      lengthComentar = comentar.length;
      comentar.reverse();

      if (comentar.length > 0) {
        peopleComentar.textContent = `${comentar.length} Orang telah mengucapkan`;
      } else {
        peopleComentar.textContent = `Belum ada yang mengucapkan`;
      }

      pageNumber.textContent = "1";
      renderElement(
        comentar.slice(startIndex, endIndex),
        containerComentar,
        listItemComentar
      );
    } catch (error) {
      return `Error : ${error.message}`;
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    buttonForm.textContent = "Loading...";
    buttonForm.disabled = true;

    const name = e.target.name.value;
    const message = e.target.message.value;

    const containsBadWords = (text) => {
      return badWordsList.some((badWord) =>
        text.toLowerCase().includes(badWord)
      );
    };

    if (containsBadWords(message) || containsBadWords(name)) {
      Swal.fire({
        icon: "error",
        title: "Pesan mengandung kata yang tidak pantas!",
        text: "Silakan periksa kembali pesan Anda dan pastikan tidak menggunakan kata yang tidak sopan.",
        confirmButtonText: "Tutup",
        background: "#f8f9fa",
        customClass: {
          confirmButton: "btn btn-danger",
        },
        timer: 5000,
        timerProgressBar: true,
      });
      buttonForm.textContent = "Kirim";
      buttonForm.disabled = false;
      return;
    }

    const comentar = {
      id: generateRandomId(),
      name: name,
      status: e.target.status.value === "y" ? "Hadir" : "Tidak Hadir",
      message: message,
      date: getCurrentDateTime(),
      color: generateRandomColor(),
    };

    try {
      const response = await comentarService.getComentar();

      await comentarService.addComentar(comentar);

      lengthComentar = response.comentar.length;

      peopleComentar.textContent = `${++response.comentar
        .length} Orang telah mengucapkan`;
      containerComentar.insertAdjacentHTML(
        "afterbegin",
        listItemComentar(comentar)
      );

      Swal.fire({
        icon: "success",
        title: "Terima kasih!",
        text: `Ucapan Anda telah berhasil dikirimkan!`,
        confirmButtonText: "Tutup",
        background: "#f8f9fa",
        customClass: {
          confirmButton: "btn btn-primary",
        },
        timer: 5000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error : ", error.message);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
        confirmButtonText: "Tutup",
        background: "#f8f9fa",
        customClass: {
          confirmButton: "btn btn-danger",
        },
        timer: 5000,
        timerProgressBar: true,
      });
    } finally {
      buttonForm.textContent = "Kirim";
      buttonForm.disabled = false;
      form.reset();
    }
  });

  // click prev & next
  let currentPage = 1;
  let itemsPerPage = 4;
  let startIndex = 0;
  let endIndex = itemsPerPage;

  const updatePageContent = async () => {
    containerComentar.innerHTML =
      '<h1 style="font-size: 1rem; margin: auto">Loading...</h1>';
    pageNumber.textContent = "..";
    prevButton.disabled = true;
    nextButton.disabled = true;

    try {
      const response = await comentarService.getComentar();
      const { comentar } = response;

      comentar.reverse();

      renderElement(
        comentar.slice(startIndex, endIndex),
        containerComentar,
        listItemComentar
      );
      pageNumber.textContent = currentPage.toString();
    } catch (error) {
      console.log(error);
    } finally {
      prevButton.disabled = false;
      nextButton.disabled = false;
    }
  };

  nextButton.addEventListener("click", async () => {
    if (endIndex <= lengthComentar) {
      currentPage++;
      startIndex = (currentPage - 1) * itemsPerPage;
      endIndex = startIndex + itemsPerPage;
      await updatePageContent();
    }
  });

  prevButton.addEventListener("click", async () => {
    if (currentPage > 1) {
      currentPage--;
      startIndex = (currentPage - 1) * itemsPerPage;
      endIndex = startIndex + itemsPerPage;
      await updatePageContent();
    }
  });

  initialComentar().then();
  initialBank();
};
