class Component {
    constructor() {}
    render() {}
}

class Car extends Component {
    constructor(cars) {
        super();
        this.cars = cars;
    }
    
    filterCars(tipeDriver, tanggal, waktuJemput, jumlahPenumpang) {
        return this.cars.filter((car) => {
            // const isTipeDriverMatch = tipeDriver === "semua" || car.type === tipeDriver;
            const isTanggalMatch = new Date(car.availableAt) >= new Date(tanggal);
            // const isWaktuJemputMatch = waktuJemput === "semua" || (waktuJemput === car.availableAt.split('T')[1]);
            const isJumlahPenumpangMatch = !jumlahPenumpang || car.capacity >= parseInt(jumlahPenumpang);
    
            // console.log(isTanggalMatch)
            
            if ( isTanggalMatch || isJumlahPenumpangMatch) {
                return car.available; 
            }
            return false;
        });
    }    

    displayCarList(cars) {
        // console.log(cars);
        const carList = document.getElementById('car-list');
        carList.innerHTML = '';

        if (cars.length === 0) {
            carList.innerHTML = 'Tidak ada mobil yang sesuai dengan filter.';
            return;
        }

        cars.forEach((car) => {
            // console.log(car);
            const card = document.createElement('div');
            card.classList.add('container', 'card', 'rounded-3', 'mb-3' , 'p-4', 'border-0', 'mx-1', 'col-md-4', 'col-sm-6', 'col-12');
            card.style.width = '22%';
            card.style.boxShadow = '0px 0px 4px 0px rgba(0, 0, 0, 0.15)';

            card.innerHTML = `
                    <div class="p-2">
                        <img src="${car.image}" style="width: 100%;" alt="Mobil">
                    </div>
                    <div>
                        <p class="fw-normal">Nama/Tipe Mobil</p>
                        <h2 class="fw-semibold fs-5">Rp. ${car.rentPerDay} / hari</h2>
                        <p>${car.description}</p>
                        <div class="flex flex-column">
                        <div class="d-flex flex-row gap-2 w-50 align-content-center mb-2">
                            <div class="" style="width: 24px;">
                            <img src="https://res.cloudinary.com/dyursj9xj/image/upload/v1698333301/ch-4/gchjoab4dgy8qivasoak.svg" style="width: 100%;" alt="icon_user">
                            </div>
                            <p class="my-auto">${car.capacity} Orang</p>
                        </div>
                        <div class="d-flex flex-row gap-2 w-50 align-content-center  mb-2">
                            <div class="" style="width: 24px;">
                            <img src="https://res.cloudinary.com/dyursj9xj/image/upload/v1698333301/ch-4/u4ncfxkct5p7izqcgm9x.svg" style="width: 100%;" alt="icon_user">
                            </div>
                            <p class="my-auto">${car.transmission === 'Automatic' ? 'Automatic' : 'Manual'}</p>
                        </div>
                        <div class="d-flex flex-row gap-2 w-50 align-content-center">
                            <div class="" style="width: 24px;">
                            <img src="https://res.cloudinary.com/dyursj9xj/image/upload/v1698333301/ch-4/yunphlvqni23a014mubj.svg" style="width: 100%" alt="icon_user">
                            </div>
                            <p class="my-auto">Tahun ${car.year}</p>
                        </div>
                        </div>
                    </div>
                    <button class="rounded-2 border-0 flex justify-content-center text-white fw-semibold pointer-event text-center py-3 mt-4" style="background: var(--primary-lime-green-04, #5CB85F);">
                        Pilih Mobil
                    </button>
                `;
            carList.appendChild(card);
        });
    }
}

const fetchCars = async () => {
    try {
        const response = await fetch('/data/cars.json');
        if (!response.ok) {
            throw new Error('Gagal mengambil data.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const carFilterForm = document.getElementById('carFilterForm');

fetchCars()
    .then((cars) => {
        const car = new Car(cars);

        car.displayCarList(cars);
        
        carFilterForm.addEventListener('click', function (e) {
            // console.log("hehehe")
            e.preventDefault();
        
            const tipeDriver = document.getElementById('tipeDriver').value;
            const tanggal = document.getElementById('tanggal').value;
            const waktuJemput = document.getElementById('waktuJemput').value;
            const jumlahPenumpang = document.getElementById('jumlahPenumpang').value;
        
            const formattedTanggal = `${tanggal}T${waktuJemput}`;
        
            const filteredCars = car.filterCars(tipeDriver, formattedTanggal, waktuJemput, jumlahPenumpang);
            car.displayCarList(filteredCars);
        });
        
    })
    .catch((error) => {
        throw new Error(error)
    }
);
