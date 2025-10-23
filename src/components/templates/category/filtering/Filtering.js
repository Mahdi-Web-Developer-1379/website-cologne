"use client";
import styles from "./filtering.module.css";

const smellsList = ["گرم", "سرد", "شیرین", "تلخ", "ملایم", "چوبی", "دریایی", "میوه‌ای", "مرکباتی"];
const suitableOptions = ["MEN", "WOMEN", "ALL", "همه"];

const FilteringUI = ({ filters, setFilters }) => {


    const minPrice = Math.min(...[filters.priceRange.min]);
    const maxPrice = Math.max(...[filters.priceRange.max]);

    const handlePriceChange = (e, type) => {
        const val = Number(e.target.value);
        setFilters((prev) => ({
            ...prev,
            priceRange: { ...prev.priceRange, [type]: val }
        }));
    };

    

    
    const handleSuitableClick = (option) => {
        setFilters(prev => ({
            ...prev,
            suitableFor: option === "همه" ? "" : option
        }));
    };



    return (
        <div className={styles.filtering}>
           
            <div className={styles.price_filtering}>
                <p className={styles.title}>فیلتر بر اساس قیمت:</p>
                <div className={styles.slider_container}>
                    <input
                        type="range"
                        min={0}
                        max={maxPrice}
                        defaultValue={minPrice}
                        className={styles.slider}
                        value={minPrice}
                        onChange={(e) => handlePriceChange(e, "min")}
                    />
                    <input
                        type="range"
                        min={0}
                        max={10000000}
                        defaultValue={maxPrice}
                        className={styles.slider}
                        value={maxPrice}
                        onChange={(e) => handlePriceChange(e, "max")}
                    />
                </div>
                <div className={styles.price_values}>
                    <span>از: {minPrice}</span>
                    <span>تا: {maxPrice}</span>
                </div>
            </div>

            
            <div className={styles.name_filtering}>
                <p className={styles.title}>مناسب برای:</p>
                <section>
                    {suitableOptions.map(option => (
                        <div
                            key={option}
                            className={`${styles.filter_option} ${filters.suitableFor === option ? styles.active : ""}`}
                            onClick={() => handleSuitableClick(option)}
                        >
                            <p>
                                
                                {
                                    option === "MEN" && "آقایان" ||
                                    option === "WOMEN" && "بانوان" ||
                                    option === "ALL" && "برای همه" ||
                                    option === "همه" && "تمام محصولات"
                                }
                            </p>
                        </div>
                    ))}
                </section>
            </div>

            {/* رایحه */}
            <div className={styles.name_filtering}>
                <p className={styles.title}>رایحه:</p>
                <section>
                    {smellsList.map(s => (
                        <div
                            key={s}
                            className={`${styles.filter_option} ${filters.smells.includes(s) ? styles.active : ""}`}
                            onClick={() =>
                                setFilters(prev => ({
                                    ...prev,
                                    smells: prev.smells.includes(s)
                                        ? prev.smells.filter(item => item !== s)
                                        : [...prev.smells, s]
                                }))
                            }
                        >
                            <p>{s}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default FilteringUI;




