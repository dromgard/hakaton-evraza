class MainApi {
  constructor(options) {
    this._headers = options.headers;
  }

  // Обрабатываем статус запроса к серверу, возвращаем положительный результат или промис с ошибкой.
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // Получаем данные.
  getdata() {
    return fetch(`http://kursk.dyvniy.ru:8090/exga/`, {
      // headers: this._headers,
    }).then(this._handleResponse);
  }
}

// Создаем экземпляр класса подключения к серверу.
export const mainApi = new MainApi({
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
});
