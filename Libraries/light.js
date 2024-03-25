let points = [];
let walls = [];
let rays = [];

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;

        function hit() {
            let closest_wall = null;
            let closest_t = null;
            let closest_u = null;

            for (let i = 0; i < walls.length; i++) {
                let wall = walls[i];
                let wall_x = wall.a.x - wall.b.x;
                let wall_y = wall.a.y - wall.b.y;
                let ray_x = this.a.x - this.b.x;
                let ray_y = this.a.y - this.b.y;
                let dist_x = wall.a.x - this.a.x;
                let dist_y = wall.a.y - this.a.y;

                let denominator = wall_x * ray_y - wall_y * ray_x;
                let t = (dist_x * ray_y - dist_y * ray_x) / denominator;

                if (t >= 0 && t <= 1) {
                    let u = (wall_x * dist_y - wall_y * dist_x) / denominator;

                    if (u > 0 && (u < closest_u || closest_u == null)) {
                        closest_wall = wall;
                        closest_t = t;
                        closest_u = u;
                    }
                }
            }

            return new Vector2(closest_wall.a.x + closest_t * (closest_wall.b.x - closest_wall.a.x), closest_wall.a.y + closest_t * (closest_wall.b.y - closest_wall.a.y));
        }
    }
}

function lengthdir_x(len, angle) {
    let radian_angle = angle * math.pi / 180;
    return len * math.cos(radian_angle);
}

function lengthdir_y(len, angle) {
    let radian_angle = angle * math.pi / 180;
    return len * math.sin(radian_angle);
}

function Rectangle(x, y, w, h, angle) {
    var lxw = lengthdir_x(w, angle);
    var lxh = lengthdir_x(h, angle - 90);
    var lyw = lengthdir_y(w, angle);
    var lyh = lengthdir_y(h, angle - 90);

    var p1 = new Vector2(x - lxw - lxh, y - lyw - lyh);
    var p2 = new Vector2(x + lxw - lxh, y + lyw - lyh);
    var p3 = new Vector2(x + lxw + lxh, y + lyw + lyh);
    var p4 = new Vector2(x - lxw + lxh, y - lyw + lyh);

    points.push(p1, p2, p3, p4);
    walls.push(new Line(p1, p2), new Line(p2, p3), new Line(p3, p4), new Line(p4, p1));
}

let mousePos = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
});

points = [];
walls = [];
rays = [];

// Setup the canvas

room = new Rectangle(canvas.width / 2, canvas.height / 2, canvas.width / 2, canvas.height / 2, 0);
wall_draw = [];

walls.forEach(wall => {
    wall_draw.push(new Rectangle(wall.a.x, wall.a.y, wall.width / 2, wall.height / 2, 0));
});

let grid = new Array(new Array(points.length * 3), new Array(points.length * 3));

let count = 0;
points.forEach(point => {
    var currPos = new Vector2(mousePos.x, mousePos.x);
    var dir = new Vector2(c.x - point.x, c.y - point.y);

    var o = 0.1;
    for (let j = -0; j <= 0; j += o) {
        p = new Vector2(mousePos.x + lengthdir_x(32, dir + j), mousePos.y + lengthdir_y(32, dir + j));
        m = new Line(currPos, p);
        var hit = m.hit();

        grid[0][count] = p;
        grid[1][count] = new Vector2(m.a.x - hit.x, m.a.y - hit.y);

        count++;
    }
});

grid[1].sort();

// Draw the canvas

let canvas = document.getElementById('intro_canvas');
let ctx = canvas.getContext('2d');

function init() {
    canvas = document.getElementById('intro_canvas');
    ctx = canvas.getContext('2d');
    setInterval(draw, 10);
    console.log("Initialised: " + new Date());
}

function draw() {
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    for (let i = 0; i < grid[0].length; i++) {
        let p = grid[0][i];
        let q = grid[0][(i < grid[0].length - 1) ? (i + 1) : 0];

        ctx.moveTo(mousePos.x, mousePos.y);
        ctx.lineTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.fill();
    }
    ctx.closePath();
}