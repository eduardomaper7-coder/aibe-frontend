import styles from "./TopInfoBar.module.css";

export default function TopInfoBar() {
  return (
    <div className={styles.bar}>
      <p className={styles.text}>
        CALLE GALCERAN NUM 15, 03 Santa Cruz de Tenerife, Santa Cruz de
        Tenerife 38003 España
      </p>
    </div>
  );
}
