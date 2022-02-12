(() => {
  "use strict";
  var t = "todos";
  function e() {
    var e = sessionStorage.getItem(t);
    return e ? JSON.parse(e) : [];
  }
  var o = function (o) {
    var n = o.name,
      s = o.isCompleted,
      d = document.createElement("li");
    d.classList.add("todo-item"),
      s && d.classList.toggle("todo-item_completed");
    var i = document.createElement("span");
    (i.innerText = n), i.classList.add("todo-text"), d.appendChild(i);
    var a = document.createElement("button");
    (a.innerHTML = '<i class="fas fa-check"></i>'),
      a.classList.add("todo-check-button"),
      a.addEventListener(
        "click",
        (function (o) {
          return function (n) {
            n.preventDefault(),
              o.classList.toggle("todo-item_completed"),
              (function (o) {
                var n = e(),
                  s = Array.from(o.childNodes).find(function (t) {
                    return t.classList.contains("todo-text");
                  });
                if (s) {
                  var d = n.map(function (t) {
                    return (
                      (t.isCompleted =
                        t.name == s.innerText ? !t.isCompleted : t.isCompleted),
                      t
                    );
                  });
                  sessionStorage.setItem(t, JSON.stringify(d));
                }
              })(o);
          };
        })(d)
      ),
      d.appendChild(a);
    var r = document.createElement("button");
    return (
      (r.innerHTML = '<i class="fas fa-trash"></i>'),
      r.classList.add("todo-remove-button"),
      r.addEventListener(
        "click",
        (function (o) {
          return function (n) {
            n.preventDefault(),
              o.classList.add("todo-item_fall"),
              o.addEventListener("transitionend", function () {
                console.log(o),
                  (function (o) {
                    var n = e();
                    n.length ||
                      (document.querySelector(".todo-select").disabled = !0);
                    var s = Array.from(o.childNodes).find(function (t) {
                      return t.classList.contains("todo-text");
                    });
                    if (s) {
                      var d = n.filter(function (t) {
                        return t.name !== s.innerText;
                      });
                      console.log(d),
                        sessionStorage.setItem(t, JSON.stringify(d));
                    }
                  })(o),
                  o.remove();
              });
          };
        })(d)
      ),
      d.appendChild(r),
      d
    );
  };
  function n(t) {
    return {
      todoInput: t.querySelector(".todo-input"),
      todoHelper: t.querySelector(".todo-helper"),
      todoButton: t.querySelector(".todo-button"),
    };
  }
  function s(t) {
    var e = n(t),
      o = e.todoInput,
      s = e.todoHelper,
      d = e.todoButton;
    o.value.length >= 3
      ? (d.classList.remove("todo-button_disabled"),
        s.classList.remove("todo-helper_visible"))
      : (d.classList.add("todo-button_disabled"),
        s.classList.add("todo-helper_visible"));
  }
  var d = document.querySelector(".todo-input-wrapper"),
    i = n(d),
    a = i.todoInput,
    r = i.todoButton,
    l = document.querySelector(".todo-list"),
    c = document.querySelector(".todo-select");
  document.addEventListener("DOMContentLoaded", function () {
    var t;
    (t = JSON.parse(sessionStorage.getItem("todos"))),
      console.log(t + " parse"),
      t.forEach(function (t) {
        var e = o(t);
        l.appendChild(e);
      }),
      sessionStorage.getItem("todos").length || (c.disabled = !0),
      s(d);
  }),
    a.addEventListener("input", function () {
      return s(d);
    }),
    r.addEventListener("click", function (s) {
      s.preventDefault();
      var i,
        r,
        u = { name: a.value, isCompleted: !1 };
      (c.disabled = !1),
        (i = u),
        (r = e()).push(i),
        sessionStorage.setItem(t, JSON.stringify(r));
      var p = o(u);
      l.appendChild(p),
        (function (t) {
          var e = n(t),
            o = e.todoInput,
            s = e.todoHelper,
            d = e.todoButton;
          (o.value = ""),
            d.classList.add("todo-button_disabled"),
            s.classList.add("todo-helper_visible");
        })(d);
    }),
    c.addEventListener("change", function (t) {
      var e = l.childNodes;
      console.log(t.target.value),
        (function (t, e) {
          t.length &&
            t.forEach(function (t) {
              switch (e) {
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
        })(e, t.target.value);
    });
})();
