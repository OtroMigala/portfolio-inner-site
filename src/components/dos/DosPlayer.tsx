import React, { useEffect, useRef, useState } from 'react';

import { DosPlayer as Instance, DosPlayerFactoryType } from 'js-dos';
import loadJsDos from './loadJsDos';

declare const Dos: DosPlayerFactoryType;

interface PlayerProps {
    width: number;
    height: number;
    bundleUrl: string;
}

export default function DosPlayer(props: PlayerProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    const [dos, setDos] = useState<Instance | null>(null);

    useEffect(() => {
        if (rootRef === null || rootRef.current === null) {
            return;
        }

        const root = rootRef.current as HTMLDivElement;
        let instance: Instance | null = null;
        let cancelled = false;

        loadJsDos().then(() => {
            if (cancelled) return;
            instance = Dos(root);

            setDos(instance);
            const elements = root.getElementsByClassName('flex-grow-0');

            while (elements.length > 0) {
                elements[0].remove();
            }
        });

        return () => {
            cancelled = true;
            instance?.stop();
        };
    }, [rootRef]);

    useEffect(() => {
        if (dos !== null) {
            // Absolute from the app root so nested routes and subpath hosting work.
            dos.run(`${process.env.PUBLIC_URL}/${props.bundleUrl}`);
        }
    }, [dos, props.bundleUrl]);
    return (
        <div
            ref={rootRef}
            style={{
                width: props.width,
                height: props.height,
                position: 'absolute',
            }}
        ></div>
    );
}
