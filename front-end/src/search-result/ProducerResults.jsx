function ProducerResults({ producers }) {
  return (
    <div>
      {producers.map((producer) => (
        <Producer key={producer.id} producer={producer} />
      ))}
    </div>
  );
}

export default ProducerResults;