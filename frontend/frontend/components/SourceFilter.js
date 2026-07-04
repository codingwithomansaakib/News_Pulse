export default function SourceFilter({ value, onChange }) {

    return (

        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >

            <option value="">All Sources</option>

            <option>BBC</option>

            <option>NPR</option>

            <option>Reuters</option>

        </select>

    );

}