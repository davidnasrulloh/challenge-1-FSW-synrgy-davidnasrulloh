function filterCarByAvailability(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  
  // Tempat penampungan hasil
  const result = []
  // Tulis code-mu disini
  // menggunakan mapping
  cars?.map((item) => {
    if(item?.available === true){
      result.push(item)
    }
  });
  // console.log(result);

  // Rubah code ini dengan array hasil filter berdasarkan availablity
  return result;
}
