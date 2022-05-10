export function collision(attackBox, hitbox) {
    return attackBox.position.x + attackBox.width >= hitbox.position.x &&
        attackBox.position.x <= hitbox.position.x + hitbox.width &&
        attackBox.position.y + attackBox.height >= hitbox.position.y &&
        attackBox.position.y <= hitbox.position.y + hitbox.height
}