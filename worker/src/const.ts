export const TOPIC_NAME = 'zaps';
import { Kafka } from 'kafkajs';
export const kafka = new Kafka({
    clientId: 'worker',
    brokers: ['localhost:9092'],
})

