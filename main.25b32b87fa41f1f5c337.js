(() => {
  "use strict";
  var t = "todos";
  function e() {
    var e = sessionStorage.getItem(t);
    return e ? JSON.parse(e) : [];
  }
  var o = function (o) {
    var n = document.createElement("li");
    n.classList.add("todo-item");
    var d = document.createElement("span");
    (d.innerText = o), d.classList.add("todo-text"), n.appendChild(d);
    var s = document.createElement("button");
    (s.innerHTML = '<i class="fas fa-check"></i>'),
      s.classList.add("todo-check-button"),
      s.addEventListener(
        "click",
        (function (t) {
          return function (e) {
            e.preventDefault(), t.classList.toggle("todo-item_completed");
          };
        })(n)
      ),
      n.appendChild(s);
    var a = document.createElement("button");
    return (
      (a.innerHTML = '<i class="fas fa-trash"></i>'),
      a.classList.add("todo-remove-button"),
      a.addEventListener(
        "click",
        (function (o) {
          return function (n) {
            n.preventDefault(),
              o.classList.add("todo-item_fall"),
              o.addEventListener("transitionend", function () {
                !(function (o) {
                  var n = e(),
                    d = Array.from(o.childNodes).find(function (t) {
                      return t.classList.contains("todo-text");
                    });
                  if (d) {
                    var s = n.filter(function (t) {
                      return t !== d.innerText;
                    });
                    sessionStorage.setItem(t, JSON.stringify(s));
                  }
                })(o),
                  o.remove();
              });
          };
        })(n)
      ),
      n.appendChild(a),
      n
    );
  };
  function n(t) {
    return {
      todoInput: t.querySelector(".todo-input"),
      todoHelper: t.querySelector(".todo-helper"),
      todoButton: t.querySelector(".todo-button"),
    };
  }
  function d(t) {
    var e = n(t),
      o = e.todoInput,
      d = e.todoHelper,
      s = e.todoButton;
    o.value.length >= 3
      ? (s.classList.remove("todo-button_disabled"),
        d.classList.remove("todo-helper_visible"))
      : (s.classList.add("todo-button_disabled"),
        d.classList.add("todo-helper_visible"));
  }
  var s = document.querySelector(".todo-input-wrapper"),
    a = n(s),
    i = a.todoInput,
    r = a.todoButton,
    l = document.querySelector(".todo-list"),
    c = document.querySelector(".todo-select");
  document.addEventListener("DOMContentLoaded", function () {
    e().forEach(function (t) {
      var e = o(t);
      l.appendChild(e);
    }),
      d(s);
  }),
    i.addEventListener("input", d),
    r.addEventListener("click", function (d) {
      var a, r;
      d.preventDefault(),
        (a = i.value),
        (r = e()).push(a),
        sessionStorage.setItem(t, JSON.stringify(r));
      var c = o(i.value);
      l.appendChild(c),
        (function (t) {
          var e = n(t),
            o = e.todoInput,
            d = e.todoHelper,
            s = e.todoButton;
          (o.value = ""),
            s.classList.add("todo-button_disabled"),
            d.classList.add("todo-helper_visible");
        })(s);
    }),
    c.addEventListener("change", function (t) {
      var e, o;
      (e = l.childNodes),
        (o = t.target.value),
        e.length &&
          e.forEach(function (t) {
            switch (o) {
              case "completed":
                t.classList.contains("todo-item_completed")
                  ? (t.style.display = "flex")
                  : (t.style.display = "none");
                break;
              case "uncompleted":
                t.classList.contains("todo-item_completed")
                  ? (t.style.display = "none")
                  : (t.style.display = "flex");
                break;
              default:
                return void (t.style.display = "flex");
            }
          });
    });
})();
