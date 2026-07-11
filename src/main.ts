import Phaser from 'phaser';

const WIDTH = 960;
const HEIGHT = 540;
const PLAYER_SPEED = 220;
const ENEMY_SPEED = 70;
// 멈췄을 때 세상이 흐르는 최소 배율. 0이면 물리 엔진 나눗셈이 터진다.
const IDLE_TIME_SCALE = 0.12;

class PrototypeScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  private enemies!: Phaser.Physics.Arcade.Group;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>;
  private dim!: Phaser.GameObjects.Rectangle;
  private worldSpeed = 1;

  create() {
    const g = this.add.graphics();
    g.fillStyle(0xf2f2f2).fillRect(0, 0, 16, 16).generateTexture('player', 16, 16);
    g.clear().fillStyle(0xe4573d).fillCircle(8, 8, 8).generateTexture('enemy', 16, 16);
    g.destroy();

    this.player = this.physics.add.image(WIDTH / 2, HEIGHT / 2, 'player');
    this.player.setCollideWorldBounds(true);

    this.enemies = this.physics.add.group();
    this.time.addEvent({ delay: 900, loop: true, callback: () => this.spawnEnemy() });

    this.physics.add.overlap(this.player, this.enemies, () => this.scene.restart());

    this.dim = this.add
      .rectangle(0, 0, WIDTH, HEIGHT, 0x05060a)
      .setOrigin(0)
      .setAlpha(0)
      .setDepth(10);

    this.add
      .text(WIDTH / 2, HEIGHT - 28, 'WASD / 방향키 이동 — 움직일 때만 시간이 흐른다', {
        fontSize: '16px',
        color: '#9aa0b0',
      })
      .setOrigin(0.5)
      .setDepth(11);

    const kb = this.input.keyboard!;
    this.cursors = kb.createCursorKeys();
    this.wasd = {
      up: kb.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: kb.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      left: kb.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: kb.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }

  update(_time: number, deltaMs: number) {
    const dir = new Phaser.Math.Vector2(
      Number(this.cursors.right.isDown || this.wasd.right.isDown) -
        Number(this.cursors.left.isDown || this.wasd.left.isDown),
      Number(this.cursors.down.isDown || this.wasd.down.isDown) -
        Number(this.cursors.up.isDown || this.wasd.up.isDown),
    ).normalize();

    const moving = dir.lengthSq() > 0;
    const target = moving ? 1 : IDLE_TIME_SCALE;
    const lerp = 1 - Math.exp(-10 * (deltaMs / 1000));
    this.worldSpeed = Phaser.Math.Linear(this.worldSpeed, target, lerp);

    // Arcade 물리는 timeScale이 클수록 느려지고, Clock은 작을수록 느려진다 — 서로 반대.
    this.physics.world.timeScale = 1 / this.worldSpeed;
    this.time.timeScale = this.worldSpeed;

    // 플레이어는 실시간 속도 유지: 물리 감속을 역보정해서 SUPERHOT 감각을 만든다.
    this.player.setVelocity(
      (dir.x * PLAYER_SPEED) / this.worldSpeed,
      (dir.y * PLAYER_SPEED) / this.worldSpeed,
    );

    this.enemies.getChildren().forEach((obj) => {
      const enemy = obj as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
      const aim = new Phaser.Math.Vector2(this.player.x - enemy.x, this.player.y - enemy.y)
        .normalize()
        .scale(ENEMY_SPEED);
      enemy.setVelocity(aim.x, aim.y);
    });

    this.dim.setAlpha((1 - this.worldSpeed) * 0.45);
  }

  private spawnEnemy() {
    const edge = Phaser.Math.Between(0, 3);
    const x = edge === 0 ? -20 : edge === 1 ? WIDTH + 20 : Phaser.Math.Between(0, WIDTH);
    const y = edge === 2 ? -20 : edge === 3 ? HEIGHT + 20 : Phaser.Math.Between(0, HEIGHT);
    this.enemies.add(this.physics.add.image(x, y, 'enemy'));
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: '#14161d',
  pixelArt: true,
  physics: { default: 'arcade' },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: PrototypeScene,
});
